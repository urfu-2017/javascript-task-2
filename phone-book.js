'use strict';

exports.isStar = true;
var phoneBook = [];
exports.add = function (phone, name, email) {
    if (!correctNumber(phone) || !correctName(name) ||
    !correctInfo(phone) || !correctEmail(email)) {

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
    if (typeof phone !== 'string') {
        return false;
    }
    if (phone.length !== 10) {
        return false;
    }
    for (let i = 0; i < phone.length; i++) {
        if (!(phone[i] >= '0' && phone[i] <= '9')) {
            return false;
        }
    }

    return true;
}

function correctName(name) {

    return (typeof name === 'string' && name.length !== 0);
}

function correctEmail(email) {
    return ((typeof email === 'string' &&
    email.length > 0 && email.indexOf('@') !== -1) || email === undefined);
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
    if (!correctName(name) || !correctEmail(email)) {
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
    var found = exports.find(query);
    found.splice(found.length, 1);

    return found.length;
};

exports.find = function (query) {
    var result = [];
    if (!query) {
        return [];
    }
    if (query === '*') {
        query = '';
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (findInfo(query, phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email)) {
            result.push(toFormat(phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email));
        }
    }

    return result.sort();
};

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
            count += 1;
        }
    }

    return count;
}
