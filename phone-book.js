'use strict';

exports.isStar = true;

var phoneBook = {};

exports.add = function (phone, name, email) {
    if (!/^\d{10}$/.test(phone) || phone in phoneBook || !name) {
        return false;
    }
    phoneBook[phone] = [name, email];

    return true;
};

exports.update = function (phone, name, email) {
    if (!(phone in phoneBook) || !name) {
        return false;
    }
    phoneBook[phone] = [name, email];

    return true;
};

function findAll(query) {
    var result = [];
    if (!query) {
        return result;
    }
    if (query === '*') {
        query = '';
    }
    Object.keys(phoneBook).forEach(phone => {
        var [name, email] = phoneBook[phone];
        var item = [name, email, phone];
        if (item.filter(x => String(x || '').indexOf(query) !== -1).length) {
            result.push(item);
        }
    });

    return result;
}

exports.findAndRemove = function (query) {
    var found = findAll(query);
    for (var [,, phone] of found) {
        delete phoneBook[phone];
    }

    return found.length;
};

exports.find = function (query) {
    var found = findAll(query);
    var result = [];
    for (var [name, email, phone] of found) {
        var [, code, aaa, bb, cc] = /^(\d{3})(\d{3})(\d\d)(\d\d)$/.exec(phone);
        result.push(`${name}, +7 (${code}) ${aaa}-${bb}-${cc}${email ? ', ' + email : ''}`);
    }
    result.sort();

    return result;
};


exports.importFromCsv = function (csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует
    var total = 0;
    for (var line of csv.split('\n')) {
        var [name, phone, email] = line.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            total++;
        }
    }

    return total;
};
