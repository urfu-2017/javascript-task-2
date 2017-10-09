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
const phoneNumberPattern = new RegExp('\\d{10}');

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */

exports.add = function (phone, name, email) {
    if (!isValidRecord(phone, name, email) || phoneBook.some(record => record.phone === phone)) {
        return false;
    }
    phoneBook.push({ 'phone': phone, 'name': name, 'email': email });

    return true;
};

function isValidRecord(phone, name, email) {
    let haveStringType = typeof phone === 'string' && typeof name === 'string' &&
    (typeof email === 'string' || typeof email === 'undefined');

    return haveStringType && phoneNumberPattern.test(phone);
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    let recordIndex = phoneBook.findIndex(record => record.phone === phone);
    if (!isValidRecord(phone, name, email) || recordIndex === -1) {
        return false;
    }

    let selectedRecord = phoneBook[recordIndex];
    selectedRecord.name = name;
    selectedRecord.email = typeof email === 'undefined' ? '' : email;

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Array}
 */
exports.findAndRemove = function (query) {
    let selectedRecords = findRecordsOrderedByName(query);
    phoneBook = selectedRecords.filter(record => !selectedRecords.includes(record));

    return selectedRecords.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    let selectedRecords = findRecordsOrderedByName(query);

    return selectedRecords.map(convertToString).sort();
};

function findRecordsOrderedByName(query) {
    if (query === '*') {
        return phoneBook;
    }

    if (typeof query !== 'string' || query === '') {
        return [];
    }

    return phoneBook.filter(record => Object.values(record).some(value => value.includes(query)));
}

function convertToString(record) {
    let formattedPhone = `+7 (${record.phone.slice(0, 3)}) ${record.phone.slice(3, 6)}` +
    `-${record.phone.slice(6, 8)}-${record.phone.slice(8)}`;
    let email = record.email === '' ? '' : `, ${record.email}`;

    return `${record.name}, ${formattedPhone}${email}`;
}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let parsedRecords = csv.split('\n').map(line => line.split(';'));
    let recordsCounter = 0;
    for (let recordTokens of parsedRecords) {
        let [name, phone, email] = recordTokens;
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            recordsCounter += 1;
        }
    }

    return recordsCounter;
};
