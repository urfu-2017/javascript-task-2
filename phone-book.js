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

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} 
 */
exports.add = function (phone, name, email) {
    if (!isPhoneCorrect(phone) || isAlreadyAdded(phone) || !isNameCorrect(name)) {
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
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    if (!isPhoneCorrect(phone) || !isNameCorrect(name) || !phoneBook[phone]) {
        return false;
    }
    phoneBook[phone] = { name, email };

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    let suitable = findRecords(query);
    for (const record of suitable) {
        delete phoneBook[record.phone];
    }

    return suitable.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    let suitable = findRecords(query);
    suitable.sort((a, b) => a.name < b.name ? -1 : 1);
    for (let i = 0; i < suitable.length; i++) {
        let stringValue = suitable[i].name + ', ' + getBeautifulPhone(suitable[i].phone) +
        (suitable[i].email ? ', ' + suitable[i].email : '');
        suitable[i] = stringValue;
    }

    return suitable;
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let addedOrUpdatedCounter = 0;
    for (const recordString of csv.split('\n')) {
        const [name, phone, email] = recordString.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            addedOrUpdatedCounter++;
        }
    }

    return addedOrUpdatedCounter;
};

function isPhoneCorrect(phoneNumber) {
    if (phoneNumber === undefined) {
        return false;
    }
    let pattern = /\d{10}/;
    let a = pattern.exec(phoneNumber);

    return phoneNumber.length === 10 && a !== null && a.index === 0;
}

function isNameCorrect(name) {
    return typeof name === 'string' && name !== '';
}

function getBeautifulPhone(phone) {
    return `+7 (${phone.substring(0, 3)}) ` +
    `${phone.substring(3, 6)}-${phone.substring(6, 8)}-${phone.substring(8, 10)}`;
}

function findRecords(query) {
    if (!isStringCorrect(query)) {
        return [];
    }
    let pattern = query === '*' ? new RegExp('.*') : new RegExp(query);
    let suitable = [];
    for (const phone of Object.keys(phoneBook)) {
        if (isMatched(pattern, phone)) {
            suitable.push({ phone: phone,
                name: phoneBook[phone].name, email: phoneBook[phone].email });
        }
    }

    return suitable;
}

function isStringCorrect(string) {
    return typeof string === 'string' && string !== '';
}

function isMatched(pattern, phone) {
    return pattern.exec(phone) ||
        pattern.exec(phoneBook[phone].name) || pattern.exec(phoneBook[phone].email);
}

function isAlreadyAdded(phone) {
    return Object.keys(phoneBook).indexOf(phone) !== -1;
}
