'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook;

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean} 
 */
exports.addhel = function (phone, name) {
    if (name === '' || phone.length !== 10) {
        return true;
    }

    return false;
};

exports.addhelpen = function (phone, name, name1, phone1) {
    if (name === '' || (name1 === name || phone1 === phone)) {
        return true;
    } else {
        return false;
    }
};


exports.add = function (phone, name, email) {
    phone = String(phone);
    if (exports.addhel(phone, name)) {
        return false;
    }
    if (phone === undefined) {
        phone = '';
    }
    if (email === undefined) {
        email = '';
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (exports.addhelpen(phone, name, phoneBook[i].name,
            phoneBook[i].phone)) {
            return false;
        }
    }
    phoneBook.push({
        name: name,
        phone: phone,
        email: email
    });

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean}
 */
exports.update = function (phone, name, email) {
    phone = String(phone);
    if (phone.length !== 10 && phone.length !== 0) {
        return false;
    }
    if (name === undefined) {
        name = '';
    }
    if (email === undefined) {
        email = '';
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            phoneBook[i].name = name;
            phoneBook[i].email = email;

            return true;
        }
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns{number}
 */
exports.findAndRemove = function (query) {
    if (query === '') {
        return undefined;
    }
    var schet = 0;
    for (var i = phoneBook.length - 1; i >= 0; i--) {
        if (exports.findhelp(phoneBook[i].name.indexOf(query),
            phoneBook[i].phone.indexOf(query), phoneBook[i].email.indexOf(query))) {
            phoneBook.splice(i, i + 1);
            schet += 1;
        }
    }

    return schet;
};

exports.findhelp = function (one, two, free) {
    if (one !== -1 || two !== -1 || free !== -1) {
        return true;
    } else {
        return false;
    }
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {array}
 */
exports.find = function (query) {
    if (query === '') {
        return undefined;
    }
    var exit = [];
    for (var i = 0; i < phoneBook.length; i++) {
        if (exports.findhelp(phoneBook[i].name.indexOf(query),
            phoneBook[i].phone.indexOf(query), phoneBook[i].email.indexOf(query)) ||
            query === '*') {
            exit.push(phoneBook[i].name + ', +7 (' + phoneBook[i].phone.slice(0, 3) + ') ' +
phoneBook[i].phone.slice(3, 6) + '-' + phoneBook[i].phone.slice(6, 8) + '-' +
phoneBook[i].phone.slice(8, 10) + ', ' + phoneBook[i].email);
        }
    }
    exit.sort();

    return exit;
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    var schet = 0;
    var name1;
    var phone1;
    var email1;
    csv = csv.split('\n');
    for (var i = 0; i < csv.length; i++) {
        name1 = csv[i].slice(0, csv[i].indexOf(';'));
        phone1 = csv[i].slice(csv[i].indexOf(';') + 1, csv[i].lastIndexOf(';'));
        email1 = csv[i].slice(csv[i].lastIndexOf(';') + 1, csv[i].length);
        if (exports.add(phone1, name1, email1)) {
            schet += 1;
        }
        if (exports.update(phone1, name1, email1)) {
            schet += 1;
        }
    }

    return schet;
};
// Парсим csv
// Добавляем в телефонную книгу
// Либо обновляем, если запись с таким телефоном уже существует
