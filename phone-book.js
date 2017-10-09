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
    res = res.sort(function (a, b) {
        var nameA = a.toLowerCase();
        var nameB = b.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });

    return res;
}
function numberFormater(number) {
    return '+7 (' + number.substring(0, 3) + ') ' +
        number.substring(3, 6) + '-' + number.substring(6, 8) + '-' +
        number.substring(8, 10);
}
function checkInput(phone, name, email) {
    var entry = {};
    if (typeof(phone) !== 'string' || typeof(name) !== 'string') {
        throw new TypeError('Incorrect input!');
    }
    if (typeof email === 'undefined') {
        entry = { phone: phone, name: name };
    } else {
        entry = { phone: phone, name: name, email: email };
    }

    return entry;
}
function sanityCheck(phone, name, email) {
    var reg = new RegExp('^[0-9]{10}$');
    var regEmail = new RegExp('@');
    if (!reg.test(phone) || (typeof name === 'undefined') ||
        !checkIfName(name)) {
        return false;
    }
    if ((typeof name !== 'undefined') && (typeof email !== 'undefined') &&
        !regEmail.test(email)) {
        return false;
    }

    return true;
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
    if (!sanityCheck(phone, name, email)) {
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
    var reg = new RegExp('^[0-9]{10}$');
    if (!reg.test(phone) || (typeof name === 'undefined') ||
        !checkIfName(name)) {
        return false;
    }
    var entry = checkInput(phone, name, email);
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
    if (typeof(query) !== 'string') {
        throw new TypeError('Incorrect input!');
    }
    if (query === '') {

        return 0;
    }
    if (query === '*') {
        var output = phoneBook.length;
        phoneBook = [];

        return output;
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
    if (typeof(query) !== 'string') {
        throw new TypeError('Incorrect input!');
    }
    if (query === '') {
        return '';
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
