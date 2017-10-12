/* eslint max-statements: ["error", 16] */
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
 * Проверка на корректность введенных данных
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean}
 */
let isCorrect = function (phone, name, email) {
    if (email === undefined) {
        return !phoneTemp.test(phone) || !nameTemp.test(name);
    }

    return !phoneTemp.test(phone) || !nameTemp.test(name) || !emailTemp.test(email);
};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    if (isCorrect(phone, name, email) || name === undefined) {
        return false;
    }
    if (findEntry(phone)) {
        return false;
    }
    if (email === undefined) {
        phoneBook.push([name, phone].join(';'));

        return true;
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
    if (isCorrect(phone, name, email)) {
        return false;
    }
    let toUpdate = findEntry(phone);
    if (toUpdate) {
        if (email === undefined) {
            email = '';
        }
        let index = phoneBook.indexOf(toUpdate);
        if (!emailTemp.test(toUpdate) && email !== '') {
            phoneBook[index] = phoneBook[index].replace(nameTemp, name) + ';' + email;

            return true;
        }
        if (email === '') {
            // При удалении email-a хотим также убрать и разделитель
            emailTemp = /;[\w-.]+@[\w]+\.+[a-zA-Z]{2,4}/;
        }
        phoneBook[index] = phoneBook[index].replace(nameTemp, name).replace(emailTemp, email);
        emailTemp = /[\w-.]+@[\w]+\.+[a-zA-Z]{2,4}/;

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

            return entry.replace(phoneTemp, show(phone)).replace(/;/g, ', ');
        }).sort();
    }

    return phoneBook.filter(entry => {
        return entry.search(query) !== -1;
    }).map(entry => {
        let phone = entry.match(phoneTemp)[0];

        return entry.replace(phoneTemp, show(phone)).replace(/;/g, ', ');
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
    let entries = csv.split('\n');
    let counter = 0;
    for (let entry of entries) {
        let [name, phone, email] = entry.split(';');
        if (exports.add(phone, name, email)) {
            counter++;
            continue;
        }
        if (exports.update(phone, name, email)) {
            counter++;
        }
    }

    return counter;
};
