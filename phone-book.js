/* eslint max-statements: ["error", 16] */
/* eslint complexity: ["error", 7] */
'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

/**
 * Телефонная книга
 */
let phoneBook = [];
let phoneTemp = /[0-9]{10}/;
let nameTemp = /[^@;]+/;
let emailTemp = /[\w-.]+@[\w]+\.+[a-zA-Z]+/;

/**
 * Поиск любого вхождения в телефонную книгу
 * @param {String} item
 * @returns {Array}
 */
let findEntry = function (item) {
    return phoneBook.find(entry => entry.find(detail => detail === item));
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
        return phoneTemp.test(phone) && nameTemp.test(name);
    }

    return phoneTemp.test(phone) && nameTemp.test(name) && emailTemp.test(email);
};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    if (name === undefined || !isCorrect(phone, name, email)) {
        return false;
    }
    if (findEntry(phone) || findEntry(name)) {
        return false;
    }
    if (email === undefined) {
        phoneBook.push([name, phone]);

        return true;
    }
    if (findEntry(email)) {
        return false;
    }
    phoneBook.push([name, phone, email]);

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
    if (name === undefined || !isCorrect(phone, name, email)) {
        return false;
    }
    let toUpdate = findEntry(phone);
    if (toUpdate) {
        if (email === undefined) {
            toUpdate.splice(2, 1);
            toUpdate.splice(0, 1);
            toUpdate.unshift(name);

            return true;
        }
        toUpdate.splice(2, 1);
        toUpdate.splice(0, 1);
        toUpdate.unshift(name);
        toUpdate.push(email);

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
            let mod = entry.slice();
            mod[1] = show(entry[1]);

            return mod.join(', ');
        }).sort();
    }

    return phoneBook.filter(entry => entry.find(detail => detail.match(query))).map(entry => {
        let mod = entry.slice();
        mod[1] = show(entry[1]);

        return mod.join(', ');
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
    let processed = phoneBook.filter(entry => !entry.find(detail => detail.match(query)));
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
