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

function generateStr(key) {
    var str = '';

    str += phoneBook[key][0] + ', ';
    str += '+7 (' + key.slice(0, 3) + ') ' +
    key.slice(3, 6) + '-' + key.slice(6, 8) +
    '-' + key.slice(8, 10);
    if (phoneBook[key][1]) {
        str += ', ' + phoneBook[key][1];
    }

    return str;
}
function findInObj(query) {
    var key;
    var result = [];
    query = query || '';

    for (key in phoneBook) {
        if (key.indexOf(query) !== -1) {
            result.push(generateStr(key));
        } else if (phoneBook[key][0].indexOf(query) !== -1 ||
        phoneBook[key][1].indexOf(query) !== -1) {
            result.push(generateStr(key));
        }
    }

    return result.sort();
}

function removeInObj(query) {
    var count = 0;
    var key;
    query = query || '';

    for (key in phoneBook) {
        if (key.indexOf(query) !== -1) {
            delete phoneBook[key];
            count++;
        } else if (phoneBook[key][0].indexOf(query) !== -1 ||
        phoneBook[key][1].indexOf(query) !== -1) {
            delete phoneBook[key];
            count++;
        }
    }

    return count;
}

exports.add = function (phone, name, email) {
    if (/[^0-9]/.test(phone) || phone.length !== 10) {
        return false;
    }
    if (phoneBook[phone] || !name) {
        return false;
    }
    email = email || '';
    var arr = [name, email];
    phoneBook[phone] = arr;

    return true;
};

exports.update = function (phone, name, email) {
    if (!name) {

        return false;
    }
    email = email || '';
    if (phoneBook[phone]) {
        phoneBook[phone][0] = name;
        if (email !== '') {
            phoneBook[phone][1] = email;
        }

        return true;
    }

    return false;
};

exports.findAndRemove = function (query) {
    if (!query) {
        return 0;
    }

    if (query === '*') {

        return removeInObj();
    }

    return removeInObj(query);
};

exports.find = function (query) {
    if (!query) {

        return [];
    }

    if (query === '*') {
        return findInObj();
    }

    return findInObj(query);
};

function updateOrAdd(phone, name, email) {
    if (phoneBook[phone]) {
        phoneBook[phone][0] = name;
        phoneBook[phone][1] = email;

        return 1;
    }
    if (phone.length === 10) {
        var arr = [name, email];
        phoneBook[phone] = arr;

        return 1;
    }

    return 0;
}
exports.importFromCsv = function (csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует
    var arr = csv.split('\n');
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i].split(';');
        var name = item[0];
        var phone = item[1];
        var email = item[2];

        if (updateOrAdd(phone, name, email)) {
            count++;
        }
    }

    return count;
};
