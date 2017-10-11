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
var FORMAT_PHONE = /\d{10}/;

function checkValid(phone, name) {
    var okPhone = FORMAT_PHONE.exec(phone);
    if (typeof name === 'string') {

        return (okPhone);
    }

    return false;
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.add = function (phone, name, email) {
    if (checkValid(phone, name) && !phoneBook.some(value => value.phone === phone)) {
        phoneBook.push({ phone, name, email });

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
    if (checkValid(phone, name) && phoneBook.some(value => value.phone === phone)) {
        phoneBook[phoneBook.findIndex(value => value.phone === phone)] = { phone, name, email };

        return true;
    }

    return false;
};


/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

exports.findAndRemove = function (query) {
    var pB = phoneBook.length;
    phoneBook = phoneBook.filter(value => {
        if (typeof value.email === 'string') {

            return !(value.phone.includes(query) || value.name.includes(query) ||
                value.email.includes(query));
        }

        return !(value.phone.includes(query) || value.name.includes(query));
    });

    return (pB - phoneBook.length);
};

function coompareName(a, b) {
    if (a.name < b.name) {

        return -1;
    }
    if (a.name > b.name) {

        return 1;
    }
    if (a.name === b.name) {

        return 0;
    }
}

function toformat(value) {
    if (typeof value.email !== 'string') {

        return (value.name + ', +7 (' + value.phone.slice(0, 3) + ') ' + value.phone.slice(3, 6) +
            '-' + value.phone.slice(6, 8) + '-' + value.phone.slice(8));
    }

    return (value.name + ', +7 (' + value.phone.slice(0, 3) + ') ' + value.phone.slice(3, 6) +
    '-' + value.phone.slice(6, 8) + '-' + value.phone.slice(8) + ', ' + value.email);
}

function fromcvs(i, value) {
    if (exports.add(value.phone, value.name, value.email) ||
        exports.update(value.phone, value.name, value.email)) {

        return (i + 1);
    }

    return (i);
}

function combine(value) {
    var data = value.split(';');

    return ({ phone: data[1], name: data[0], email: data[2] });
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

exports.find = function (query) {
    switch (query) {
        case '':

            return [];
        case '*':

            return phoneBook.sort(coompareName)
                .map(toformat);
        default:

            return (phoneBook.filter(value => {
                if (typeof value.email === 'string') {

                    return (value.phone.includes(query) || value.name.includes(query) ||
                        value.email.includes(query));
                }

                return (value.phone.includes(query) || value.name.includes(query));
            }).sort(coompareName)
                .map(toformat));
    }
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */

exports.importFromCsv = function (csv) {

    return (csv.split('\n').map(combine)
        .reduce(fromcvs, 0));
};
