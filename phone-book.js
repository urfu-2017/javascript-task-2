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

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} Is add operation successful
 */
exports.add = function (phone, name, email) {
    if (checkPhone(phone) && checkName(name) && !checkRecordExist(phone, name, email)) {
        phoneBook[phone] = { name: name, email: email ? email : '' };

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} Is update operation successful
 */
exports.update = function (phone, name, email) {
    if (checkPhone(phone) && checkRecordExist(phone)) {
        phoneBook[phone] = { name: name ? name : phoneBook[phone].name, email: email ? email : '' };

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {int} Remove records count
 */
exports.findAndRemove = function (query) {
    if (query === '*') {
        const records = findAll();
        phoneBook = {};

        return records.length;
    }

    const recordsToRemove = findByQuery(query);
    for (const [phone] of recordsToRemove) {
        delete phoneBook[phone];
    }

    return recordsToRemove.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array} formatted strings
 */
exports.find = function (query) {
    let data = [];
    if (query === '*') {
        data = findAll();
    } else {
        data = findByQuery(query);
    }

    return formatOutput(data);
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
    let successOperationCount = 0;
    for (const line of csv.split('\n')) {
        const [name, phone, email] = line.split(';');
        if (checkRecordExist(phone) && exports.update(phone, name, email) ||
            exports.add(phone, name, email)) {
            successOperationCount++;
        }
    }

    return successOperationCount;
};

function checkName(name) {
    return typeof name === 'string' && name !== '';
}

function checkPhone(phone) {
    const PHONE_REGEX = /^(\d)\1\1(\d)\2\2(\d)\3(\d)\4$/;

    return PHONE_REGEX.test(phone);
}

function checkRecordExist(phone) {
    return Object.keys(phoneBook).findIndex(function (phoneInBook) {
        return phoneInBook === phone;
    }) !== -1;
}

function findAll() {
    return Object.entries(phoneBook);
}

function findByQuery(query) {
    return Object.entries(phoneBook).filter(function (record) {
        return record[1].email.includes(query) ||
            record[1].name.includes(query) ||
            record[0].includes(query);
    });
}

function formatOutput(records) {
    records.sort(function (record1, record2) {
        if (record1[1].name === record2[1].name) {
            return 0;
        }

        return record1[1].name > record2[1].name ? 1 : -1;
    });

    return records.map(formatLine);
}

function formatLine(record) {
    const phoneAndName = [record[1].name, formatPhone(record[0])];
    if (record[1].email) {
        phoneAndName.push(record[1].email);
    }

    return phoneAndName.join(', ');
}

function formatPhone(phone) {
    const secondPart = `${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}`;

    return `+7 (${phone.slice(0, 3)}) ${secondPart}`;
}
