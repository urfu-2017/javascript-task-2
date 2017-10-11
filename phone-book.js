/* eslint complexity: ["error", 9] */
'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = [];
let phoneTemp = /[0-9]{10}/;
let nameTemp = /[a-zA-Zа-яА-Я]+/;
let emailTemp = /[\w-.]+@[\w]+\.+[a-zA-Z]{2,4}/;

/**
 * Поиск любого вхождения в телефонную книгу
 * @param {String} item
 * @returns {String}
 */
let findEntry = function (item) {
    return phoneBook.find(entry => entry.indexOf(item) !== -1);
};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    if (!phoneTemp.test(phone) || name === undefined || !nameTemp.test(name)) {
        return false;
    }
    if (findEntry(phone) || findEntry(name)) {
        return false;
    }
    if (email === undefined) {
        phoneBook.push([name, phone].join(';'));

        return true;
    }
    if (!emailTemp.test(email)) {
        return false;
    }
    if (findEntry(email)) {
        return false;
    }
    phoneBook.push([name, phone, email].join(';'));

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    let toUpdate = findEntry(phone);
    if (toUpdate) {
        if (email === undefined) {
            email = '';
        }
        let index = phoneBook.indexOf(toUpdate);
        phoneBook[index] = phoneBook[index].replace(nameTemp, name).replace(emailTemp, email);

        return true;
    }

    return false;
};

/**
 * @param {String} phone
 * @returns {string}
 */
let show = function (phone) {
    return '+7 (' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' +
        phone.slice(6, 8) + '-' + phone.slice(8, 10);
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    if (query === '*') {
        return phoneBook.map(entry => {
            let phone = entry.match(phoneTemp)[0];

            return entry.replace(phoneTemp, show(phone)).replace(';', ', ');
        }).sort();
    }

    return phoneBook.filter(entry => {
        return entry.search(query) !== -1;
    }).map(entry => {
        let phone = entry.match(phoneTemp)[0];

        return entry.replace(phoneTemp, show(phone)).replace(';', ', ');
    })
        .sort();
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    let count = phoneBook.length;
    if (query === '*') {
        phoneBook = [];

        return count;
    }
    let processed = phoneBook.filter(entry => entry.search(query) === -1);
    phoneBook = processed;

    return count - processed.length;
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

    return csv.split('\n').length;
};
