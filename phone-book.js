'use strict';

exports.isStar = false;

var phoneBook = [];

exports.add = function (phone, name, email) {
    let note = getNote(phone, name, email);
    if (!note || isExist(note.phone)) {
        return false;
    }
    phoneBook.push(note);

    return true;
};

exports.update = function (phone, name, email) {
    let note = getNote(phone, name, email);
    if (!note || !(isExist(note.phone))) {
        return false;
    }
    let index = findIndexByNote(note);
    phoneBook[index] = note;

    return true;

};

exports.findAndRemove = function (query) {
    let founded = findNotes(query);
    let count = founded.length;
    for (let i = 0; i < count; i++) {
        let index = phoneBook.indexOf(founded[i]);
        let temp = phoneBook.slice(index, i);
        phoneBook = temp;
    }

    return count;
};

exports.find = function (query) {
    if (! isValidStr(query) || query.length === 0) {
        return null;
    }
    let founded = findNotes(query);
    let res = [];
    for (let i = 0; i < founded.length; i++) {
        res[i] = noteToStr(founded[i]);
    }
    res.sort();

    return res;
};

exports.importFromCsv = function (csv) {

    return csv.split('\n').length;
};

function findIndexByNote(note) {
    let index = -1;
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === note.phone) {
            index = i;
            break;
        }
    }

    return index;
}

function findNotes(query) {
    if (query === '*') {
        return phoneBook;
    }
    let foundNotes = [];
    for (let i = 0; i < phoneBook.length; i++) {
        if (noteMatches(query, phoneBook[i])) {
            foundNotes.push(phoneBook[i]);
        }
    }

    return foundNotes;
}

function noteMatches(query, note) {
    let phoneMathes = note.phone.indexOf(query) !== -1;
    let emailMatches = note.email.indexOf(query) !== -1;
    let nameMatches = note.name.indexOf(query) !== -1;

    return phoneMathes || emailMatches || nameMatches;
}

function noteToStr(note) {
    let rawPhone = note.phone;
    let formatedPhone = `+7 (${rawPhone.substr(0, 3)}) ${
        rawPhone.substr(3, 3)}-${rawPhone.substr(6, 2)}-${rawPhone.substr(8, 2)}`;
    if (note.email === '') {
        return `${note.name}, ${formatedPhone}`;
    }

    return `${note.name}, ${formatedPhone}, ${note.email}`;
}

function getNote(phone, name, email) {
    if (! (isValidStr(phone) && isValidNumber(phone) && isValidStr(name) && name.length !== '')) {
        return null;
    }
    let note = {};
    note.phone = phone;
    note.name = name;
    if (isValidStr(email) && isValidEmail(email)) {
        note.email = email;
    } else {
        note.email = '';
    }

    return note;
}

function isExist(phone) {
    let index = -1;
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            index = i;
            break;
        }
    }

    return index !== -1;
}

function isValidStr(str) {
    return typeof(str) === 'string';
}

function isValidEmail(email) {
    let re = /^([a-z0-9-]+@[a-z0-9]+\.[a-z0-9-]{2,4})$/i;
    let result = re.exec(email);
    if (result) {
        return result[0] === email;
    }

    return false;
}

function isValidNumber(str) {
    if (str.length !== 10) {
        return false;
    }
    let re = /^\d{10}$/;
    if (re.exec(str)) {
        return true;
    }

    return false;
}
