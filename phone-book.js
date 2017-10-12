'use strict';
exports.isStar = false;

var phoneBook = [];
// функции для add + update
function validName(name) {
    if (typeof(name) !== 'string') {
        return false;
    }
    if (name === undefined) {
        return false;
    }
    if (name === null) {
        return false;
    }
    if (name.length === 0) {
        return false;
    }

    return true;
}
function validPhone(phone) {
    if (!/^\d{10}$/.test(phone)) {
        return false;
    }
    if (phone === undefined) {
        return false;
    }
    if (phone === null) {
        return false;
    }

    return true;
}
function validEmail(email) {
    if (email === undefined) {
        return true;
    }
    if (typeof(email) === 'string') {
        return true;
    }

    return false;
}
// функции для find + findAndRemove
function validQuery(query) {
    return (typeof(query) === 'string' || query.length !== 0);
}
function outPhone(i) {
    return '+7 (' + phoneBook[i].phone.slice(0, 3) + ') ' +
    phoneBook[i].phone.slice(3, 6) + '-' + phoneBook[i].phone.slice(6, 8) +
    '-' + phoneBook[i].phone.slice(8, 10);
}
function outRecord() {
    let out = '';
    let arr = [];
    for (let i = 0; i < phoneBook.length; i++) {
        out = phoneBook[i].name + ', ' + outPhone(i);
        if (phoneBook[i].email) {
            out += ', ' + phoneBook[i].email;
        }
        arr.push(out);
    }

    return arr;
}
function sortName(name1, name2) {
    if (name1.name > name2.name) {
        return 1;
    }
    if (name1.name < name2.name) {
        return -1;
    }

    return 0;
}
function outNote(i) {
    phoneBook.sort(sortName);
    let out = '';
    out = phoneBook[i].name + ', ' + outPhone(i);
    if (phoneBook[i].email !== undefined) {
        out += ', ' + phoneBook[i].email;
    }

    return out;
}

function search(query) {
    phoneBook.sort(sortName);
    let x = [];
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].name !== undefined && phoneBook[i].name.indexOf(query) !== -1 ||
        phoneBook[i].phone !== undefined && phoneBook[i].phone.indexOf(query) !== -1 ||
        phoneBook[i].email !== undefined && phoneBook[i].email.indexOf(query) !== -1) {
            x.push(outNote(i));
        }
    }

    return x;
}
function checkQuery(query, name, phone, email) {
    return (name !== undefined && name.indexOf(query) !== -1 ||
    phone !== undefined && phone.indexOf(query) !== -1 ||
    email !== undefined && email.indexOf(query) !== -1);
}
exports.add = function (phone, name, email) {
    let mas = [];
    if (validPhone(phone) && validName(name) && validEmail(email)) {
        mas.name = name;
        mas.phone = phone.toString();
        mas.email = email;

    } else {

        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phone === phoneBook[i].phone) {

            return false;
        }
    }
    phoneBook.push(mas);

    return true;
};
exports.update = function (phone, name, email) {
    if (!validName(name) || !(validEmail(email) || !(validPhone(phone)))) {

        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phone === phoneBook[i].phone) {
            phoneBook[i] = { name: name, phone: phone.toString(), email: email };

            return true;
        }
    }

    return false;
};
exports.find = function (query) {
    let sortPhoneBook = [];
    if (!validQuery(query) || query === '') {

        return [];
    } else if (query === '*') {
        phoneBook.sort(sortName);

        return outRecord();
    } else if (query !== '*') {
        sortPhoneBook = search(query);

        return sortPhoneBook;
    }
};
exports.findAndRemove = function (query) {
    let ind = 0;
    if (!validQuery(query) || query === '') {

        return ind;
    }
    if (query === '*') {
        ind = phoneBook.length;
        phoneBook.splice(0, ind);

        return ind;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (checkQuery(query, phoneBook[i].name, phoneBook[i].phone, phoneBook[i].email)) {
            phoneBook.splice(i, 1);
            i--;
            ind++;
        }
    }

    return ind;
};
