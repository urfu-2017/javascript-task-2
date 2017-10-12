'use strict';
function isValidPhone(phone) {
    return /^([0-9]){10}$/.test(phone);
}

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

/**
 * Телефонная книга
 */
var phoneBook = [];

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Bool} result
 */
exports.add = function (phone, name, email) {
    for (var i = 0; i < phoneBook.length; i++) {
        if (phone === phoneBook[i].phone || phoneBook[i].email === email) {
            return false;
        }
    }
    if (!isValidPhone(phone)) {
        return false;
    }
    if (name === undefined) {
        return false;
    }
    phoneBook.push({
        phone: phone,
        name: name,
        email: email
    });

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Bool} result
 */
exports.update = function (phone, name, email) {
    for (var i = 0; i < phoneBook.length; i++) {
        if (phone === phoneBook[i].phone) {
            phoneBook[i].name = name;
            phoneBook[i].email = email;
        }
    }

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} resultOfOperation
 */
exports.findAndRemove = function (query) {
    var numberOfDelete = 0;
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone.indexOf(query) !== -1 ||
        phoneBook[i].name.indexOf(query) !== -1 ||
        (phoneBook[i].email !== undefined && phoneBook[i].email.indexOf(query) !== -1)) {
            phoneBook.splice(i, 1);
            i--;
            numberOfDelete++;
        }
    }

    return numberOfDelete;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array} result
 */
exports.find = function (query) {
    if (query === '') {
        return [];
    }
    if (query === '*') {
        query = '';
    }
    var arrFindSort = [];
    for (var i = 0; i < phoneBook.length; i++) {
        if (some(phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email, query)) {
            arrFindSort.push(phoneBook[i].name + ',' + ' +7 (' + phoneBook[i].phone.slice(0, 3) + ') '
            + phoneBook[i].phone.slice(3, 6) + '-' +
            + phoneBook[i].phone.slice(6, 8) + '-' + phoneBook[i].phone.slice(8, 10)+ ', '+phoneBook[i].email);
        }
        else {
            arrFindSort.push(phoneBook[i].name + ',' + ' +7 (' + phoneBook[i].phone.slice(0, 3) + ') '
            + phoneBook[i].phone.slice(3, 6) + '-' +
            + phoneBook[i].phone.slice(6, 8) + '-' + phoneBook[i].phone.slice(8, 10));
        }
}

    return arrFindSort.sort();
};

function some(phone, name, email, query){
    if (phone !== undefined && (phone.indexOf(query)!==-1 ||
    name.indexOf(query)!==-1 ||
    (email!== undefined && email.indexOf(query)!==-1))){

    return true;
    }

    return false;
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

    return csv.split('\n').length;
};
