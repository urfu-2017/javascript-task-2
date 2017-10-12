'use strict';
exports.isStar = false;

var phoneBook = [];
// функции для add + update
function validName(name) {
    if (name !== undefined && name !== null && typeof(name) === 'string') {
        return false;
    }

    return true;
}
function validPhone(phone) {
    let phoneRegExp = /^[0-9]{10}$/;
    if (typeof(phone) === 'string' && phoneRegExp.test(phone) && phone.length === 10) {
        return false;
    }

    return true;
}
function validEmail(email) {
    if (email === undefined) {
        return false;
    }
    if (typeof(email) === 'string') {
        return false;
    }

    return true;
}
function checkPhone(phone) {
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {

            return false;
        }
    }

    return true;
}
// функции для find + findAndRemove
function validQuery(query) {
    if (typeof(query) !== 'string' || query === '' || query === undefined ||
    query === null) {
        return '';
    }
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
}
function outNote(i) {
    phoneBook.sort(sortName);
    let out = '';
    out = phoneBook[i].name + ', ' + outPhone(i);
    if (phoneBook[i].email) {
        out += ', ' + phoneBook[i].email;
    }

    return out;
}

function search(query) {
    validQuery(query);
    phoneBook.sort(sortName);
    let x = [];
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].name.indexOf(query) !== -1 || phoneBook[i].phone.indexOf(query) !== -1 ||
         (phoneBook[i].email !== undefined && phoneBook[i].email.indexOf(query) !== -1)) {
            x.push(outNote(i));
        }
    }

    return x;
}
exports.add = function (phone, name, email) {

    if (validPhone(phone) || validName(name) || validEmail(email)) {
        return false;
    }

    if (checkPhone(phone)) {
        phoneBook.push({ name: name, phone: phone, email: email });

        return true;
    }

    return false;
};
exports.update = function (phone, name, email) {
    if (validName(name)) {

        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            phoneBook[i] = { name: name, phone: phone, email: email };

            return true;
        }
    }

    return false;
};
exports.find = function (query) {
    if (typeof(query) !== 'string' || query === '' || query === undefined) {

        return '';
    } else if (query === '*') {
        phoneBook.sort(sortName);

        return outRecord();
    } else if (query !== '*') {
        let sortPhoneBook = [];
        sortPhoneBook.sort(sortName);
        sortPhoneBook = search(query);

        return sortPhoneBook;
    }
};
exports.findAndRemove = function (query) {
    let delPhoneBook = exports.find(query);
    let count = 0;
    for (let i = 0; i < delPhoneBook.length; i++) {
        delPhoneBook.splice(i, 1);
        i--;
        count++;
    }

    return count;
};

