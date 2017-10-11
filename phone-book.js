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


function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
}

function isValidName(name) {
    return typeof name === 'string' && name !== '';
}

function equalsEntries(entry, otherEntry) {
    return entry.phone === otherEntry.phone;
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    if (!isValidName(name) || !isValidPhone(phone)) {
        return false;
    }
    let entry = {
        phone,
        name,
        email
    };
    for (let otherEntry of phoneBook) {
        if (equalsEntries(entry, otherEntry)) {
            return false;
        }
    }
    phoneBook.push(entry);

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
    if (!isValidName(name) || !isValidPhone(phone)) {
        return false;
    }
    for (let entry of phoneBook) {
        if (entry.phone !== phone) {
            continue;
        }
        entry.name = name;
        entry.email = email;

        return true;
    }
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    let remoteCounter = 0;
    for (let i = phoneBook.length - 1; i > -1; i--) {
        if (entryContainsQuery(phoneBook[i], query)) {
            phoneBook.splice(i, 1);
            remoteCounter++;
        }
    }

    return remoteCounter;
};

function sortByName(a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }

    return 0;
}

function entryContainsQuery(entry, query) {
    return (entry.name.indexOf(query) !== -1 ||
    entry.phone.indexOf(query) !== -1 ||
    entry.email !== undefined && entry.email.indexOf(query) !== -1);
}

function extractListByQuery(query) {
    if (query === '') {
        return [];
    }
    if (query === '*') {
        return phoneBook.sort(sortByName);
    }
    let result = [];
    for (let entry of phoneBook) {
        if (entryContainsQuery(entry, query)) {
            result.push(entry);
        }
    }
    result.sort(sortByName);

    return result;
}


function convertEntryToStr(entry) {
    let reg = /(\d{3})(\d{3})(\d{2})(\d{2})/;
    let phoneParts = reg.exec(entry.phone);
    let phone = `+7 (${phoneParts[1]}) ${phoneParts[2]}-${phoneParts[3]}-${phoneParts[4]}`;

    let email = '';
    if (entry.email !== undefined && entry.email !== '') {
        email = `, ${entry.email}`;
    }

    return `${entry.name}, ${phone}${email}`;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    let result = [];
    let entries = extractListByQuery(query);
    for (let entry of entries) {
        result.push(convertEntryToStr(entry));
    }

    return result;
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

    let changedEntries = 0;
    for (let str of csv.split('\n')) {
        let [name, phone, email] = str.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            changedEntries++;
        }
    }

    return changedEntries;
};
