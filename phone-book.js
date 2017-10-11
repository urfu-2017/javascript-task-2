'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = {};
const correctPhoneRegExp = /^(\d{10})$/;

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Bool}
 */
exports.add = function (phone, name, email) {
    if (name === undefined) {
        return false;
    }
    if (phone.match(correctPhoneRegExp) !== null &&
    name.match(/.+/) !== null && !(phone in phoneBook)) {
        if (email === undefined) {
            email = '';
        }
        phoneBook[phone] = { Name: name, Email: email };

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Bool}
 */
exports.update = function (phone, name, email) {
    if (phone in phoneBook) {
        if (name.match(/.+/) !== null) {
            phoneBook[phone].Name = name;
        }
        if (email === undefined) {
            email = '';
        }
        phoneBook[phone].Email = email;

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
    let countRemove = 0;
    for (let phone in phoneBook) {
        if (findRecords(phone, query)) {
            delete phoneBook[phone];
            countRemove ++;
        }
    }

    return countRemove;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    let foundRecords = [];
    const keys = Object.keys(phoneBook);
    for (let i = 0; i < keys.length; i++) {
        if (findRecords(keys[i], query)) {
            foundRecords.push(convertRecords(keys[i]));
        }
    }

    return foundRecords.sort();
};

function findRecords(phone, query) {
    if (query === '') {
        return false;
    }
    if (query === '*') {
        return true;
    }
    if (phone.indexOf(query) !== -1 ||
    phoneBook[phone].Name.indexOf(query) !== -1 ||
    phoneBook[phone].Email.indexOf(query) !== -1) {
        return true;
    }

    return false;
}

function convertPhone(phone) {
    return '+7 (' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) +
    '-' + phone.slice(6, 8) + '-' + phone.slice(8);
}

function convertRecords(phone) {
    let record = [];
    record.push(phoneBook[phone].Name);
    record.push(convertPhone(phone));
    if (phoneBook[phone].Email !== '') {
        record.push(phoneBook[phone].Email);
    }

    return record.join(', ');
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
    let countUpdate = 0;
    const records = csv.split('\n');
    for (let i = 0; i < records.length; i++) {
        const [name, phone, email] = records[i].split(';');
        if ((phone in phoneBook) && (exports.update(phone, name, email))) {
            countUpdate++;
        }
        if (exports.add(phone, name, email)) {
            countUpdate++;
        }
    }

    return countUpdate;
};
