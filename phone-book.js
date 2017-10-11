'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

/**
 * Телефонная книга
 */
var phoneBook = [];

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    var regexp = /^\d{10}$/;
    if (regexp.test(phone) && typeof name === 'string' && name !== '' && !isRecordExists(phone)) {
        if (typeof email !== 'string') {
            email = '';
        }
        var entry = { phone, name, email };
        phoneBook.push(entry);

        return true;
    }

    return false;
};

function isRecordExists(phone) {
    for (var entry of phoneBook) {
        if (phone === entry.phone) {
            return true;
        }
    }

    return false;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    if (typeof name !== 'string' || name === '') {
        return false;
    }
    var entry = getEntry(phone);
    if (entry === null) {
        return false;
    }
    if (typeof email === 'string') {
        entry.email = email;
    } else {
        entry.email = '';
    }
    entry.name = name;

    return true;
};

function getEntry(phone) {
    for (var entry of phoneBook) {
        if (phone === entry.phone) {
            return entry;
        }
    }

    return null;
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    var count = 0;
    if (query === '*') {
        count = phoneBook.length;
    }
    if (query === '') {
        count = 0;
    } else {
        let entries = exports.find(query);
        count = entries.length;
    }
    var newPhoneBook = [];
    for (let entry of phoneBook) {
        var record = conversionToFormat(entry).join(', ');
        if (record.indexOf(query) === -1 && query !== '*' || query === '') {
            newPhoneBook.push(entry);
        }
    }
    phoneBook = newPhoneBook;

    return count;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String}
 */
exports.find = function (query) {
    if (query === '*') {
        return outputAllEntries();
    }
    if (query === '' || typeof query !== 'string') {
        return [];
    }
    phoneBook.sort(sName);
    var entries = [];
    for (let entry of phoneBook) {
        var record = conversionToFormat(entry).join(', ');
        if (record.indexOf(query) !== -1) {
            entries.push(record);
        }
    }

    return entries;
};

function outputAllEntries() {
    phoneBook.sort(sName);
    var entries = [];
    for (let entry of phoneBook) {
        var arr = [];
        arr = conversionToFormat(entry);
        entries.push(arr.join(', '));
    }

    return entries;
}

function phoneFormat(n) {
    var newPhoneNumber = '+7 (' + n.substr(0, 3) + ') ' + n.substr(3, 3) + '-' +
    n.substr(6, 2) + '-' + n.substring(8);

    return newPhoneNumber;
}

function conversionToFormat(entry) {
    var arr = [];
    if (entry.email === '' || entry.email === undefined || entry.email === null) {
        arr = [entry.name, phoneFormat(entry.phone)];
    } else {
        arr = [entry.name, phoneFormat(entry.phone), entry.email];
    }

    return arr;
}

function sName(i, ii) {
    return i.name > ii.name;
}

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
