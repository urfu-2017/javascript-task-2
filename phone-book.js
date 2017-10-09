'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

/**
 * Телефонная книга
 */
var phoneBook = [];
function checkIfName(name) {
    var reg = new RegExp('@');

    return !reg.test(name);
}
function formatData(data) {
    var res = [];
    for (var index = 0; index < data.length; ++index) {
        var tempStr = '';
        if ((typeof data[index].email !== 'undefined')) {
            tempStr = data[index].name + ', ' + numberFormater(data[index].phone) +
                ', ' + data[index].email;
        } else {
            tempStr = data[index].name + ', ' + numberFormater(data[index].phone);
        }
        res.push(tempStr);
    }
    res = res.sort();

    return res;
}
function numberFormater(number) {
    return '+7 (' + number.substring(0, 3) + ') ' +
        number.substring(3, 6) + '-' + number.substring(6, 8) + '-' +
        number.substring(8, 10);
}
function checkInput(phone, name, email) {
    var entry = {};
    if (typeof email === 'undefined') {
        entry = { phone: phone, name: name };
    } else {
        entry = { phone: phone, name: name, email: email };
    }

    return entry;
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean} success or failure
 */
exports.add = function (phone, name, email) {
    var entry = {};
    var reg = new RegExp('^[0-9]{10}$');
    if (!reg.test(parseInt (phone)) || (typeof name === 'undefined') ||
        !checkIfName(name)) {
        return false;
    }
    for (var index = 0; index < phoneBook.length; ++index) {
        if ((typeof phoneBook[index].phone !== 'undefined') &&
            phoneBook[index].phone.localeCompare(phone) === 0) {
            return false;
        }
    }
    entry = checkInput(phone, name, email);
    phoneBook.push(entry);

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean} success or failure
 */
exports.update = function (phone, name, email) {
    var entry = { phone: phone, name: name, email: email };
    var reg = new RegExp('^[0-9]{10}$');
    if (!reg.test(parseInt (phone)) || (typeof name === 'undefined') ||
        !checkIfName(name)) {
        return false;
    }
    for (var index = 0; index < phoneBook.length; ++index) {
        if ((typeof phoneBook[index].phone !== 'undefined') &&
            phoneBook[index].phone.localeCompare(phone) === 0) {
            phoneBook[index] = entry;

            return true;
        }
    }

    return false;
};


/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {number} number of entries deleted
 */
exports.findAndRemove = function (query) {
    var out = [];
    if (query === '') {

        return 0;
    }
    if (query === '*') {
        phoneBook = [];

        return phoneBook.length;
    }
    for (var index = 0; index < phoneBook.length; ++index) {
        advancedPush(helper(index, query), out);
    }
    for (var i = 0; i < out.length; ++i) {
        var ind = phoneBook.indexOf(out[i]);
        phoneBook.splice(ind, 1);
    }

    return out.length;
};
function helper(index, query) {
    for (var k in phoneBook[index]) {
        if (phoneBook[index].hasOwnProperty(k) &&
            (typeof phoneBook[index][k] !== 'undefined') &&
            phoneBook[index][k].indexOf(query) !== -1) {
            return phoneBook[index];
        }
    }

    return '';
}
function advancedPush(data, arr) {
    if (data !== '') {
        arr.push(data);
    }
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String} query result
 */
exports.find = function (query) {
    var out = [];
    if (query === '') {
        return;
    }
    if (query === '*') {
        return formatData(phoneBook);
    }
    for (var index = 0; index < phoneBook.length; ++index) {
        advancedPush(helper(index, query), out);
    }
    if (out.length !== 0) {
        return formatData(out);
    }

    return '';
};

/*
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
