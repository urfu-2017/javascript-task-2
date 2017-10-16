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

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
var regul = new RegExp(/^(5{3})(\d{3})(\d{2})(\d{2})$/);
exports.add = function (phone, name, email) {
    var added = false;
    if (phone && name && regul.test(phone) && !phoneBook.hasOwnProperty(phone)) {
        added = true;
        phoneBook[phone] = [name, email];
    }

    return added;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.update = function (phone, name, email) {
    var updater = false;
    if (!name) {

        return updater;
    }
    email = email || '';
    if (phoneBook[phone]) {
        phoneBook[phone][0] = name;
        phoneBook[phone][1] = email;
        updater = true;
    }

    return updater;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

exports.findAndRemove = function (query) {
    var remove = 0;
    for (var key in phoneBook) {
        if (key.indexOf(query) !== -1) {
            delete phoneBook[key];
            remove++;
        } else if (phoneBook[key][0].indexOf(query) !== -1 ||
         phoneBook[key][1].indexOf(query) !== -1) {
            delete phoneBook[key];
            remove++;
        }
    }

    return remove;
};

function correctVivod(key) {
    var Vivod;
    var CorrectPhone = '+7 (' + key.substr(0, 3) + ')' + key.substr(3, 3) + '-' +
key.substr(6, 2) + '-' + key.substring(8);
    if (phoneBook[key][1]) {
        Vivod = phoneBook[key][0] + ', ' + CorrectPhone + ', ' + phoneBook[key][1];
    } else {
        Vivod = phoneBook[key][0] + ', ' + CorrectPhone;
    }

    return Vivod;
}

function search(query) {
    var vivod = [];
    query = query || '';
    for (var key in phoneBook) {
        if (key.indexOf(query) !== -1) {
            vivod.push(correctVivod(key));
        } else if (phoneBook[key][0].indexOf(query) !== -1 ||
         phoneBook[key][1].indexOf(query) !== -1) {
            vivod.push(correctVivod(key));
        }
    }

    return vivod.sort();
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

exports.find = function (query) {
    if (!query) {
        return [];
    }
    if (query === '*') {

        return search();
    }

    return search(query);
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    var Import = 0;
    var mass = csv.split('\n');
    for (var i = 0; mass.length > i; i++) {
        var str = mass[i].split(';');
        var name = str[0];
        var phone = str[1];
        var email = str[2] || '';
        if (phoneBook[phone]) {
            phoneBook[phone][0] = name;
            phoneBook[phone][1] = email;
            Import++;
        }
        if (phone && name && regul.test(phone) && !phoneBook.hasOwnProperty(phone)) {
            phoneBook[phone] = [name, email];
            Import ++;
        }
    }

    return Import;
};
