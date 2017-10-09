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
var validatorPhone = new RegExp('[0-9]{10}');

var unificationEmail = function (email) {
    if (email === undefined) {

        return '';
    }

    return email;
};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {bool} isAdd
 */
exports.add = function (phone, name, email) {
    if (Object.keys(phoneBook).indexOf(phone) !== -1) {

        return false;
    }
    if ((!validatorPhone.test(phone)) || (phone.length !== 10)) {

        return false;
    }
    if ((name === undefined) || (name.length === 0)) {

        return false;
    }
    phoneBook[phone] = [name, unificationEmail(email)];

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {bool} isUpdate
 */
exports.update = function (phone, name, email) {
    if (Object.keys(phoneBook).indexOf(phone) === -1) {

        return false;
    }
    if ((name === undefined) || (name.length === 0)) {

        return false;
    }
    phoneBook[phone] = [name, unificationEmail(email)];

    return true;
};

var findAndReturnKeys = function (query) {
    if (query.length === 0) {

        return [];
    }
    if (query === '*') {

        return Object.keys(phoneBook);
    }
    var result = [];
    Object.keys(phoneBook).forEach(function (phone) {
        if ((phone.indexOf(query) !== -1) || (phoneBook[phone][0].indexOf(query) !== -1) ||
           (phoneBook[phone][1].indexOf(query) !== -1)) {
            result.push(phone);
        }
    });

    return result;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {int} amountRemoveRecord
 */
exports.findAndRemove = function (query) {
    var resultKeys = findAndReturnKeys(query);
    resultKeys.forEach(function (phone) {
        delete phoneBook[phone];
    });

    return resultKeys.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array} findRecord
 */
exports.find = function (query) {
    var resultKeys = findAndReturnKeys(query);
    var result = [];
    var phoneFormat;
    resultKeys.forEach(function (phone) {
        phoneFormat = phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4');
        if ((phoneBook[phone][1] === undefined) || (phoneBook[phone][1] === '')) {
            result.push(phoneBook[phone][0] + ', ' + phoneFormat);
        } else {
            result.push(phoneBook[phone][0] + ', ' + phoneFormat + ', ' + phoneBook[phone][1]);
        }
    });

    return result.sort();
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
    var amountAddOrUpdate = 0;
    var code;
    var recordArray;
    csv = csv.split('\n');
    csv.forEach(function (record) {
        recordArray = record.split(';');
        if (Object.keys(phoneBook).indexOf(recordArray[1]) !== -1) {
            code = exports.update(recordArray[1], recordArray[0], recordArray[2]);
        } else {
            code = exports.add(recordArray[1], recordArray[0], recordArray[2]);
        }
        if (code) {
            amountAddOrUpdate += 1;
        }
    });

    return amountAddOrUpdate;
};
