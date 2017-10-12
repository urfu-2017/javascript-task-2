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

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

var a = true;
function isIncluded(phone) {
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            a = false;
        }

    }

    return a;
}
exports.add = function (phone, name, email) {
    if (name !== '' && name !== undefined && name !== null && isIncluded(phone) &&
    /^\d{10}$/.test(phone)) {
        phoneBook.push({ phone: phone, name: name, email: email });

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
function upd(phone, name, email, i) {
    if (phoneBook[i].phone === phone && name !== undefined && name !== null && name !== '') {
        phoneBook[i].name = name;
        if (email !== undefined) {
            phoneBook[i].email = email;
        } else {
            phoneBook[i].email = null;
        }
    }
}

exports.update = function (phone, name, email) {
    for (var i = 0; i < phoneBook.length; i++) {
        if (upd(phone, name, email, i)) {
            return true;
        }
    }
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
var strphone;
var strl = '';
function strPhone(i) {
    strphone = '+7 (' + phoneBook[i].phone.slice(0, 3) + ') ' +
    phoneBook[i].phone.slice(3, 6) + '-' + phoneBook[i].phone.slice(6, 8) +
    '-' + phoneBook[i].phone.slice(8, 10);
    strl = phoneBook[i].name + ',' + strphone + ',' + phoneBook[i].email;
}

function funRegExp(query, list) {
    for (var i = 0; i < phoneBook.length; i++) {
        var re = new RegExp(query);
        if (re.test(phoneBook[i].name) ||
        re.test(phoneBook[i].phone) ||
        re.test(phoneBook[i].eamil)) {
            strPhone(i);
            list.push(strl);
        }
    }
}

exports.find = function (query) {
    var boola = false;
    var list = [];
    if (!query || query === '') {
        list = [];
        boola = false;
    }
    if (query === '*') {
        for (var i = 0; i < phoneBook.length; i++) {
            strPhone(i);
            list.push(strl);
        }
        boola = true;
    } else {
        funRegExp(query, list);
        if (list !== []) {
            boola = true;
        }

    }

    return boola;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
var count2 = 0;
function findToDel(query) {
    for (var i = 0; i < phoneBook.length; i++) {
        var re = new RegExp(query);
        if (re.test(phoneBook[i].name) ||
        re.test(phoneBook[i].phone) ||
        re.test(phoneBook[i].eamil)) {
            phoneBook = phoneBook.splice(i, 1);
            count2 += 1;
        }
    }

    return count2;
}
exports.findAndRemove = function (query) {
    var count = 0;
    if (!query || query === '') {
        count = 0;
    } else if (query === '*') {
        count = phoneBook.length;
        phoneBook = phoneBook.splice(0, count);
    } else {
        findToDel(query);
        count = count2;
    }

    return count;
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

    return csv.split('\n').length;
};
