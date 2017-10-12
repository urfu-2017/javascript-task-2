'use strict';

exports.isStar = true;
var phoneBook = [];


exports.add = function (phone, name, email) {
    if (isPhoneCorrect(phone) && isNameCorrect(name) && isAllInfoCorrect(phone)) {
        let obj = {
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

function isPhoneCorrect(phone) {
    return (phone && /^(\d){10}$/.test(phone));
}

function isNameCorrect(name) {

    return (name !== '' && typeof name === 'string');
}

function isAllInfoCorrect(phone) {
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {

            return false;
        }
    }

    return true;
}

exports.update = function (phone, name, email) {
    if (!isNameCorrect(name)) {
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
    let count = 0;
    if (typeof query !== 'string' || query === '') {
        return 0;
    }
    if (query === '*') {
        count = phoneBook.length;
        phoneBook = [];

        return count;
    }
    let i = 0;
    while (i < phoneBook.length) {
        if (findInfo(query, phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email)) {
            phoneBook.splice(i, 1);
            count++;
        } else {
            i++;
        }
    }

    return count;
};

exports.find = function (query) {
    let result = [];
    if (typeof query !== 'string' || query === '') {
        return result;
    }
    result = findTwo(query);

    return result.sort();
};

function findTwo(query) {
    let result = [];
    if (query === '*') {
        query = '';
    }

    for (let i = 0; i < phoneBook.length; i++) {
        if (findInfo(query, phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email)) {
            result.push(toFormat(phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email));
        }
    }

    return result;
}

function findInfo(query, phone, name, email) {
    if (name.indexOf(query) + 1 || phone.indexOf(query) + 1) {

        return true;
    }

    return Boolean(email && email.indexOf(query) + 1);
}

function toFormat(phone, name, email) {
    let format = '';
    let correctFormOfNumber = '+7 (' + phone.slice(0, 3) + ') ' +
        phone.slice(3, 6) + '-' +
        phone.slice(6, 8) + '-' + phone.slice(8, 10);
    if (email) {
        format = name + ', ' + correctFormOfNumber + ', ' + email;
    } else {
        format = name + ', ' + correctFormOfNumber;
    }

    return format;
}

exports.importFromCsv = function (csv) {
    let contacts = csv.split('\n');
    let count = 0;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i].split(';');
        if (exports.update(contact[1], contact[0], contact[2]) ||
            exports.add(contact[1], contact[0], contact[2])) {
            count ++;
        }
    }

    return count;
};
