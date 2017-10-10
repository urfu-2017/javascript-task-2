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
    let newPersonCard = new Person(phone, name, email);
    let havePerson = false;

    // if (name1.indexOf('a') !== -1) {
    //     return false;
    // }

    for (let memo of phoneBook) {
        havePerson = memo.phone === phone;
        if (havePerson) {
            break;
        }
    }
    if (!havePerson && name !== undefined && isCorrectPhone(phone)) {
        phoneBook.push(newPersonCard);
        havePerson = false;

        return true;
    }

    return false;
};

function isCorrectPhone(input) {
    return input.match(phonePattern) !== null && input && input.length === 10;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    for (let person of phoneBook) {
        if (person.phone === phone) {
            person.name = (name !== undefined) ? name : person.name;
            person.email = (email !== undefined) ? email : undefined;

            return true;
        }
    }

    return false;
};

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
