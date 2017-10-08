'use strict';

exports.isStar = false;
var phoneBook = [];
exports.add = function (phone, name, email) {
    if (!correctNumber(phone) || !correctName(name) || !correctInfo(phone)) {

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

function correctInfo(phone) {
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {

            return false;
        }
    }

    return true;
}

exports.update = function (phone, name, email) {
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
