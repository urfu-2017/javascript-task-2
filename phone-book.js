'use strict';

exports.isStar = true;
var phoneBook = [];
exports.add = function (phone, name, email) {
    if (!correctNumber(phone) ||
    !correctInfo(phone) || !correctName(name)) {
        return false;
    }
    phoneBook.push({
        phone: phone,
        name: name,
        email: email
    });

    return true;
};

function correctNumber(phone) {
    return /^\d{10}$/.test(phone);
}

function correctName(name) {

    return (typeof name === 'string' && name.length > 0);
}

function correctInfo(phone) {
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {

            return false;
        }
    }

    return true;
}

exports.update = function (phone, name, email) {
    if (!correctName(name)) {
        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            phoneBook[i].name = name;
            phoneBook[i].email = email;

            return true;
        }
    }
};

exports.findAndRemove = function (query) {
    var result = [];
    if (query === undefined || query === '') {

        return 0;
    }
    if (query === '*') {
        var allRemoved = phoneBook.length;
        phoneBook = [];

        return allRemoved;
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (findInfo(query, phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email)) {
            result.push(phoneBook[i]);
        }
    }
    result.splice(result.length, 1);

    return result.length;
};

exports.find = function (query) {
    var result = [];
    if (query === undefined || query === '') {
        return result;
    }
    result = findTwo(query);

    return result.sort();
};

function findTwo(query) {
    var result = [];
    if (query === '*') {
        query = '';
    }

    for (var i = 0; i < phoneBook.length; i++) {
        if (findInfo(query, phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email)) {
            result.push(toFormat(phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email));
        }
    }

    return result;
}

function findInfo(query, phone, name, email) {
    if (name.indexOf(query) !== -1 || phone.indexOf(query) !== -1) {

        return true;
    }
    if (email !== undefined && email.indexOf(query) !== -1) {

        return true;
    }

    return false;
}

function toFormat(phone, name, email) {
    var format;
    format = name + ', +7 (' + phone.slice(0, 3) + ') ' +
     phone.slice(3, 6) + '-' +
    phone.slice(6, 8) + '-' + phone.slice(8, 10);
    if (email !== undefined) {
        format += ', ' + email;
    }

    return format;
}

exports.importFromCsv = function (csv) {
    var contacts = csv.split('\n');
    var count = 0;
    for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i].split(';');
        if (exports.update(contact[1], contact[0], contact[2]) ||
    exports.add(contact[1], contact[0], contact[2])) {
            count ++;
        }
    }

    return count;
};
