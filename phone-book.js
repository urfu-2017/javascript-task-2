'use strict';

exports.isStar = true;
var phoneBook = [];
exports.add = function (phone, name, email) {
    if (correctNumber(phone) && correctName(name) && correctInfo(phone)) {
        var obj = {
            phone: phone,
            name: name
        };
        if (email) {
            obj.email = email;
        }
        phoneBook.push(obj);

        return true;
    }

    return false;
};

function correctNumber(phone) {
    return (phone !== undefined && /^(\d){10}$/.test(phone));
}

function correctName(name) {

    return (name && typeof name === 'string' && name.length > 0);
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
    if (!correctName(name) && !correctNumber(phone)) {
        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            phoneBook[i].name = name;
            phoneBook[i].email = email;

            return true;
        }
    }

    return false;
};

exports.findAndRemove = function (query) {
    var result = [];
    var y = 0;
    if (typeof query !== 'string') {
        return 0;
    }
    if (query === '') {

        return 0;
    }
    if (query === '*') {
        y = phoneBook.length;
        phoneBook = [];

        return y;
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (findInfo(query, phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email)) {
            result.splice(phoneBook[i].length, 1);
            y++;
        }
    }

    return y;
};

exports.find = function (query) {
    var result = [];
    if (typeof query !== 'string' || query === '') {
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
    var format = '';
    var phonep = '+7 (' + phone.slice(0, 3) + ') ' +
     phone.slice(3, 6) + '-' +
    phone.slice(6, 8) + '-' + phone.slice(8, 10);
    if (email !== undefined) {
        format = name + ', ' + phonep + ', ' + email;
    } else {
        format = name + ', ' + phonep;
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
