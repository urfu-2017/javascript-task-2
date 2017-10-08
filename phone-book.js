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
 * @returns {Boolean} - успешность операции
 */
exports.add = function (phone, name, email) {
    phone = String(phone);
    if (phone.length !== 10 || !phone.match(/(\d)\1\1(\d)\2\2(\d)\3(\d)\4/) ||
        !name || typeof name !== 'string' || phoneBook[phone]) {
        return false;
    }
    phoneBook[phone] = { name, email };

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} - успешность операции
 */
exports.update = function (phone, name, email) {
    phone = String(phone);
    if (phoneBook[phone] && name && typeof name === 'string') {
        phoneBook[phone] = { name, email };

        return true;
    }

    return false;
};

function fitsRecord(phone, query) {
    return phone.indexOf(query) > -1 || phoneBook[phone].name.indexOf(query) > -1 ||
        (phoneBook[phone].email && phoneBook[phone].email.indexOf(query) > -1);
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} - количество удаленных записей
 */
exports.findAndRemove = function (query) {
    query = String(query);
    let countDeleted = 0;
    if (!query) {
        return 0;
    }
    if (query === '*') {
        let result = Object.keys(phoneBook);
        phoneBook = {};

        return result;
    }
    for (let phone in phoneBook) {
        if (fitsRecord(phone, query)) {
            delete phoneBook[phone];
            countDeleted++;
        }
    }

    return countDeleted;
};

/**
 * Превращение объекта телефонной книги в надлежащий массив строк
 * @param {Object} book
 * @returns {Array} - надлежащий массив строк
 */
function bookRecordToString(book) {
    let result = [];
    for (let phone in book) {
        if (book[phone]) {
            result.push(book[phone].name + ', +7 (' + phone.slice(0, 3) + ') ' +
                phone.slice(3, 6) + '-' + phone.slice(6, 8) + '-' + phone.slice(8) +
                (book[phone].email ? (', ' + book[phone].email) : ''));
        }
    }
    result.sort();

    return result;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array} - Массиф подходящих персон в виде надлежащих строк
 */
exports.find = function (query) {
    query = String(query);
    if (query === '*') {
        return bookRecordToString(phoneBook);
    }

    if (!query) {
        return [];
    }

    let result = {};
    for (let phone in phoneBook) {
        if (fitsRecord(phone, query)) {
            result[phone] = phoneBook[phone];
        }
    }

    return bookRecordToString(phoneBook);
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let result = 0;
    csv = csv.split('\n');
    csv.map(function (person) {
        let [name, phone, email] = person.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            result++;
        }

        return 0;
    });

    return result;
};
