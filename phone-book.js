'use strict';

exports.isStar = true;

var phoneBook = [];

exports.add = function (phone, name, email) {
    let note = tryCreateNote(phone, name, email);
    if (note === null || isPhoneAlreadyExist(note.phone)) {
        return false;
    }
    phoneBook.push(note);

    return true;
};

exports.update = function (phone, name, email) {
    let note = tryCreateNote(phone, name, email);
    let index = tryFindIndexByPhone(phone);
    if (note === null || index === -1) {
        return false;
    }
    phoneBook[index] = note;

    return true;
};

exports.findAndRemove = function (query) {
    let indexes = getNoteIndexesByQuery(query);
    let newPhoneBook = [];
    for (let i = 0; i < phoneBook.length; i++) {
        if (! indexes.includes(i)) {
            newPhoneBook.push(phoneBook[i]);
        }
    }
    let count = phoneBook.length - newPhoneBook.length;
    phoneBook = newPhoneBook;

    return count;
};

exports.find = function (query) {
    let indexes = getNoteIndexesByQuery(query);
    let result = [];
    for (let i = 0; i < phoneBook.length; i++) {
        if (indexes.includes(i)) {
            result.push(noteToStr(phoneBook[i]));
        }
    }
    result.sort();

    return result;
};

exports.importFromCsv = function (csv) {
    let notes = csv.split('\n');
    let count = 0;
    for (let i = 0; i < notes.length; i++) {
        if (addOrUpdateFromCsv(notes[i])) {
            count += 1;
        }
    }

    return count;
};

function tryCreateNote(phone, name, email) {
    if (!isCorrectName(name) || !isCorrectPhone(phone)) {
        return null;
    }
    let note = {};
    note.phone = phone;
    note.name = name;
    if (isCorrectEmail(email)) {
        note.email = email;
    } else {
        note.email = undefined;
    }

    return note;
}

function addOrUpdateFromCsv(csv) {
    let values = csv.split(';');
    let isAdded = exports.add(values[1], values[0], values[2]);
    if (! isAdded) {
        isAdded = exports.update(values[1], values[0], values[2]);
    }

    return isAdded;
}

function getNoteIndexesByQuery(query) {
    let indexes = [];
    for (let i = 0; i < phoneBook.length; i++) {
        if (isNoteMacthedByQuery(phoneBook[i], query)) {
            indexes.push(i);
        }
    }

    return indexes;
}

function isPhoneAlreadyExist(phone) {
    let index = tryFindIndexByPhone(phone);

    return index !== -1;
}

function tryFindIndexByPhone(phone) {
    if (! isCorrectPhone(phone)) {
        return -1;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phone === phoneBook[i].phone) {
            return i;
        }
    }

    return -1;
}

function noteToStr(note) {
    if (note.email === undefined) {
        return `${note.name}, ${phoneToStr(note.phone)}`;
    }

    return `${note.name}, ${phoneToStr(note.phone)}, ${note.email}`;
}

function phoneToStr(phone) {
    let newPhone = `+7 (${phone.substr(0, 3)}) ${
        phone.substr(3, 3)}-${phone.substr(6, 2)}-${phone.substr(8, 2)}`;

    return newPhone;
}

function isCorrectName(name) {
    return typeof(name) === 'string' && name !== '';
}

function isCorrectEmail(email) {
    return typeof(email) === 'string' && Boolean(email.match(/[0-9a-z-]+@[0-9a-z-]+\.[0-9a-z]+/i));
}

function isCorrectPhone(phone) {
    return typeof(phone) === 'string' && Boolean(phone.match(/[0-9]{10}/)) && phone.length === 10;
}

function isQueryEmpty(query) {
    return typeof(query) !== 'string' || query === '';
}

function isNoteMacthedByQuery(note, query) {
    if (query === '*') {
        return true;
    }
    if (isQueryEmpty(query)) {
        return false;
    }
    let phoneMatched = note.phone.includes(query);
    let nameMatched = note.name.includes(query);
    let emailMatched = false;
    if (note.email !== undefined) {
        emailMatched = note.email.includes(query);
    }

    return phoneMatched || nameMatched || emailMatched;
}
