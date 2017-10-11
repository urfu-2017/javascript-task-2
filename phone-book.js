'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook = [];
var phonePattern = /^(\d{3})(\d{3})(\d{2})(\d{2})$/;

class Person {
    constructor(phone, name, email) {
        this.phone = phone;
        this.name = name;
        this.email = email;
    }
}

/**
 * 
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @return {Boolean} 
 */

exports.add = function (phone, name, email) {
    let newPersonCard;
    if (isValidFormat(phone, name, email)) {
        newPersonCard = new Person(phone.toString(), name, email);
    } else {
        return false;
    }
    if (!havePerson(phone) && isCorrectPhone(phone.toString())) {
        phoneBook.push(newPersonCard);

        return true;
    }

    return false;
};

function isCorrectEmail(email) {
    if (email === undefined) {
        return true;
    }

    return typeof(email) === 'string';
}

function havePerson(phone) {
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            return true;
        }
    }

    return false;
}
function isValidFormat(phone, name, email) {
    if (typeof name !== 'string' || isNaN(phone) ||
    phone === undefined || !isCorrectEmail(email) || name === '') {
        return false;
    }

    return true;
}
function isCorrectPhone(phone) {
    return phone !== undefined && phone.match(phonePattern) !== null && typeof(phone) === 'string';
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */

exports.update = function (phone, name, email) {
    if (!havePerson(phone) || !isCorrectPhone(phone) || !isValidFormat(phone, name)) {
        return false;
    }

    return updatePerson(phone, name, email);
};


function updatePerson(phone, name, email) {
    for (let person of phoneBook) {
        if (person.phone === phone) {
            person.name = (name !== undefined) ? name : person.name;
            person.email = (email !== undefined) ? email : undefined;

            return true;
        }
    }
}


/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Integer}
 */

exports.findAndRemove = function (query) {
    if (query === '' || typeof query !== 'string') {
        return 0;
    }
    if (query === '*') {
        let del = phoneBook.length;
        phoneBook = [];

        return del;
    }
    let personFind = phoneBook.filter(function (record) {
        if (record.name.indexOf(query) !== -1 || record.phone.indexOf(query) !== -1) {
            return true;
        }
        if (record.email) {
            return record.email.indexOf(query) !== -1;
        }

        return false;
    });
    phoneBook = phoneBook.filter(function (record) {
        let flag = true;

        personFind.forEach(function (item) {
            if (item.phone === record.phone) {
                flag = false;
            }
        });

        return flag;
    });

    return personFind.length;
};


/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]} 
 */

exports.find = function (query) {
    let result = [];
    switch (query) {
        case '*':
            return designingBook(phoneBook.sort(comapareNames));
        case undefined:
            return [];
        case '':
            return [];
        default:
            result = findCards(phoneBook, query);
            result.sort(comapareNames);

            return designingBook(result);
    }
};

function comapareNames(a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }

    return 0;
}

function findCards(book, query) {
    let result = [];
    for (let card of book) {
        if (card.name.indexOf(query) !== -1 || card.phone.indexOf(query) !== -1 ||
        (card.email !== undefined && card.email.indexOf(query) !== -1)) {
            result.push(card);
        }
    }

    return result;

}
function designingBook(book) {
    let result = [];
    for (let card of book) {
        let strBuilder = '';
        strBuilder += (card.name + ', ');
        let cutPh = card.phone.match(phonePattern);
        strBuilder += '+7 (' + cutPh[1] + ') ' + cutPh[2] + '-' + cutPh[3] + '-' + cutPh[4];
        if (card.email !== undefined) {
            strBuilder += ', ' + card.email;
        }
        result.push(strBuilder);
    }

    return result;

}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let csvSplitted = csv.split('\n');
    let num = 0;
    for (var data of csvSplitted) {
        const [name, phone, email] = data.split(';');
        num = (exports.add(phone, name, email) ||
        exports.update(phone, name, email)) ? num + 1 : num;
    }

    return num;
};
