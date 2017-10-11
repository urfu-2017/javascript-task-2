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
var phoneReg = new RegExp('^[0-9]{10}$');

/**
 * @return {boolean}
 */
function CheckPhone(number) {
    return !!phoneReg.exec(number);

}
/**
 * @return {boolean}
 */
function CheckName(name) {
    return !!(name !== ' ' && name !== undefined && name !== null);

}

/**
 * @return {string}
 */
function TransformPhone(number) {
    return ('+7 (' + number.slice(0, 3) + ') ' + number.slice(3, 6)
    + '-' + number.slice(6, 8) + '-' + number.slice(8, 10));
}

/**
 * @return {boolean}
 */
function CheckRecordByPhone(number) {
    return !!phoneBook[number];

}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @return {boolean}
 */

exports.add = function (phone, name, email) {
    if (CheckPhone(phone) && CheckName(name) && !CheckRecordByPhone(phone)) {
        phoneBook[phone] = {name, email};
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
    if (CheckRecordByPhone) {
        phoneBook[phone] = {name, email};
        return true;
    }
    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
exports.findAndRemove = function (query) {
    let deleted = [];
    if (query === '*') {
        deleted = Object.keys(phoneBook);
        phoneBook = {};
        return deleted.length;
    }
    if (query !== '') {
        let phoneNumbers = Object.keys(findRecords(query));
        for (let i = 0; i <= phoneNumbers.length + 1; i++) {
            delete phoneBook[phoneNumbers[i]];
        }
        return deleted.length;
    }
    return 0;

};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function (query) {
    let result = [];
    let records = findRecords(query);
    let phoneNumbers = Object.keys(records);
    for (let phone of phoneNumbers) {
        let contacts = [];
        contacts.push(records[phone].name);
        contacts.push(TransformPhone(phone));
        contacts.push(records[phone].email);
        result.push(contacts.join(', '))
    }
    return result.sort();

};

function findRecords(query) {
    let result = {};
    if (query === '*') {
        result = phoneBook;
    }
    if (query !== '') {
        result = RecordsInBook(query)
    } else {
        result = {};
    }
    return result;
}


function RecordsInBook(query) {
    let records = {};
    for (let contact of Object.keys(phoneBook)) {
        if (CheckRecord(phoneBook[contact], query) || contact.indexOf(query)) {
            records[contact] = {
                name: phoneBook[contact].name,
                email: phoneBook[contact].email
            };
        }
    }
    return records;
}

/**
 * @return {boolean}
 */
function CheckRecord(record, query) {
    return !!((record.name.indexOf(query))
    || (record.email.indexOf(query)));
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
    let records = csv.split('\n');
    let updateRecords = 0;
    for (const [name, phone, email] of records) {
        if (exports.update(phone, name, email) || exports.add(phone, name, email)) {
            updateRecords ++;
        }
    }
    return updateRecords;
};
