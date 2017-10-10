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

function verifyPhone(phoneNumber) {
    if (/^[0-9]{10}$/.test(phoneNumber)) {
        return true;
    }

    return false;
}

function isExist(phoneNumber) {
    if (phoneNumber in phoneBook) {
        return false;
    }

    return true;
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.add = function (phone, name, email) {
    if (verifyPhone(phone) && isExist(phone) && name) {
        if (email && typeof(email) === 'string') {
            phoneBook[phone] = [name, email];
        } else {
            phoneBook[phone] = [name];
        }

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.update = function (phone, name, email) {
    if (verifyPhone(phone) && !isExist(phone) && name) {
        if (email && typeof(email) === 'string') {
            phoneBook[phone] = [name, email];
        } else {
            phoneBook[phone] = [name];
        }

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

function deleteData(data) {
    for (let i = 0; i < data.length; i++) {
        let key = data[i];
        delete phoneBook[key];
    }

    return data.length;
}

exports.findAndRemove = function (query) {
    if (!query) {
        return 0;
    }

    if (query === '*') {
        let dataNumber = Object.keys(phoneBook).length;
        phoneBook = {};

        return dataNumber;
    }

    let data = isInBook(query);
    if (data !== []) {
        return deleteData(data);
    }


};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

function findAll() {
    let data = '';
    let allData = [];

    for (let key in phoneBook) {
        if (phoneBook[key][1]) {
            data = phoneBook[key][0] + ', ' + changePhone(key) + ', ' + phoneBook[key][1];
            allData.push(data);
        } else {
            data = phoneBook[key][0] + ', ' + changePhone(key);
            allData.push(data);
        }
    }

    return allData.sort();
}

function isInBook(query) {
    let data = [];
    for (let key in phoneBook) {
        if (key.indexOf(query) !== -1 ||
        phoneBook[key][0].toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        (phoneBook[key][1] &&
            phoneBook[key][1].toLowerCase().indexOf(query.toLowerCase()) !== -1)) {
            data.push(key);
        }
    }

    return data;
}

function changePhone(phone) {
    return ('+7 (' + phone.slice(0, 3) + ') ' +
    phone.slice(3, 6) + '-' + phone.slice(6, 8) + '-' + phone.slice(8, 10));
}

function changeBook(data) {
    let foundedData = [];
    for (let i = 0; i < data.length; i++) {
        let key = data[i];
        if (phoneBook[key][1]) {
            foundedData.push(phoneBook[key][0] + ', ' + changePhone(key) +
             ', ' + phoneBook[key][1]);
        } else {
            foundedData.push(phoneBook[key][0] + ', ' + changePhone(key));
        }
    }

    return foundedData;
}

exports.find = function (query) {
    if (!query) {
        return [];
    }

    if (query === '*') {
        return findAll();
    }

    let data = isInBook(query);
    if (data !== []) {
        return changeBook(data).sort();
    }

    return [];
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
    let data = csv.split('\n');
    let verifiedData = 0;
    for (let i = 0; i < data.length; i++) {
        let block = data[i].split(';');
        if (exports.add(block[1], block[0], block[2]) ||
        exports.update(block[1], block[0], block[2])) {
            verifiedData++;
            continue;
        }
    }

    return verifiedData;
};
