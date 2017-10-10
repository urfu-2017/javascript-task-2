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
// var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.\.[a-zA-Z]{2,}$/;

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
    if (isCorrectPhone(phone) && isCorrectName(name) && isNew(phone)) {
        let newPerson = new Person (phone, name, email);
        if (email) {
            newPerson.email = email;
        }
        phoneBook.push(newPerson);

        return true;
    }
};
// console.info(exports.add('5554440044', 'Григорий', 'grisha@example.com'));

function isNew(phone) {
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            return false;
        }
    }

    return true;
}
function isCorrectName(name) {
    if (name === '' || typeof name !== 'string') {
        return false;
    }

    return true;
}
function isCorrectPhone(input) {
    return (input.match(phonePattern) !== null && input && input.length === 10);
}

// function isCorrectEmail(email) {
//     return email.match(emailPattern);
// }

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    // if (typeof name !== 'string' || !name) {
    //             return false;
    //         }
    if (!isCorrectName(name)) {
        return false;
    }
    for (let person of phoneBook) {
        if (person.phone === phone) {
            person.name = (name !== undefined) ? name : person.name;
            person.email = (email !== undefined) ? email : undefined;

            return true;
        }
    }

    return false;
};
// console.info(exports.add('5551110011', 'Алекс'));
// console.info(exports.add('5553330033', 'Валерий', 'valera@example.com'));
// console.info(exports.update('5551110011', 'Алексей', 'alex@example.com'));
// console.info(exports.update('5553330033', 'Валерий'));
// console.info(exports.update('5553330022', 'lolo'));

// function isValidData(phone, name) {
//     return !(typeof name !== 'string' || !isCorrectPhone(phone) || !name);
// }

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Integer}
 */

exports.findAndRemove = function (query) {
    let listToDel = exports.find(query);
    let num = listToDel.length;
    for (let cardToDel of listToDel) {
        let indexDel = findToDel(cardToDel);
        phoneBook.splice(indexDel, 1);
    }

    return num;
};

function findToDel(delCard) {
    for (let i = 0; i < phoneBook; i++) {
        if (phoneBook[i].phone === delCard.phone) {
            return i;
        }
    }
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]} 
 */

exports.find = function (query) {
    let result = [];
    if (typeof query !== 'string') {
        return result;
    }
    switch (query) {
        case '*':
            return designingBook(phoneBook.sort(comapareNames));
        case undefined || null:
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


/*
    Метод __find__ для поиска записей:
* На вход принимает запрос в виде строки
* Ищет вхождение этой строки хотя бы в одно из полей «Телефон», «Имя» и «Электронную почту»
* Возвращает отсортированный по «Имени» массив строк в формате `name, phone, email`
* «Имя» и «Электронную почту» выводит как есть, а «Телефон» в формате `+7 (555) 666-77-88`
* Пустой запрос не должен ничего находить
* Запрос «*» находит все записи
    */


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
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует

    return num;
    // return csv.split('\n').length;
};
