'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook = {};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name = '', email = '') {
    if (isValidNumber(phone) && validateName() && !phoneBook[phone]) {
        phoneBook[phone] = {
            phone: phone,
            name: name,
            email: email
        };

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name = '', email = '') {
    if (phoneBook[phone] && validateName(name)) {
        phoneBook[phone] = {
            phone: phone,
            name: name,
            email: email
        };

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    let findResult = simpleFind(query);
    findResult.forEach(record => delete phoneBook[record.phone]);

    return findResult.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */
exports.find = function (query) {
    return simpleFind(query)
        .map(record => getFindResultString(record));
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует

    return csv.split('\n')
        .map(string => {
            let a = string.split(';');
            let result = false;

            if (phoneBook[a[1]]) {
                result = this.update(a[1], a[0], a[2]);
            } else {
                result = this.add(a[1], a[0], a[2]);
            }


            return result;
        })
        .filter(result => result).length;
};

function simpleFind(query = '') {
    if (query) {
        let phoneBookArray = Object.keys(phoneBook)
            .map(phone => phoneBook[phone])
            .sort((a, b) => a.name > b.name ? 1 : -1);

        if (query === '*') {
            return phoneBookArray;
        }

        return phoneBookArray
            .filter(record =>
                record.name.indexOf(query) !== -1 ||
                record.phone.indexOf(query) !== -1 ||
                record.email.indexOf(query) !== -1
            );
    }

    return [];
}

function getFormatedPhone(phone) {
    let phoneArray = [
        phone.substr(0, 3),
        phone.substr(3, 3),
        phone.substr(6, 2),
        phone.substr(8, 2)
    ];

    return `+7 (${phoneArray[0]}) ${phoneArray[1]}-${phoneArray[2]}-${phoneArray[3]}`;
}

function getFindResultString(record) {
    let email = record.email.length !== 0 ? `, ${record.email}` : '';

    return `${record.name}, ${getFormatedPhone(record.phone)}${email}`;
}

function isValidNumber(phone) {
    let match = phone.toString().match(/^(\d\d\d)(\d\d\d)(\d\d)(\d\d)$/);

    if (!match || match.length !== 5 || typeof phone !== 'string') {
        return false;
    }

    let validLength = match.slice(1).reduce((result, numberPart, index) => {
        let needLength = index > 1 ? 2 : 3;
        let numbers = numberPart.split('');

        return result && numbers.filter(number => number === numbers[0]).length === needLength;
    }, true);

    return validLength;
}

function validateName(name) {
    return typeof name === 'string' && name.toString().length !== 0;
}
