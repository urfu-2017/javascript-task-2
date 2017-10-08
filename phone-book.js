'use strict';
exports.isStar = false;
var phoneBook = [];

function isDataValid(phone, name) {
    if (phone === undefined || name === undefined) {
        return false;
    }
    if (!/^\d{10}$/.test(String(phone)) || !isPhoneUnique(phone)) {
        return false;
    }

    return true;
}

function isPhoneUnique(phone) {
    return phoneBook.every(entry => entry.phone !== phone);
}

exports.add = function (phone, name, email) {
    if (isDataValid(phone, name)) {
        email = getCorrectEmail(email);
        phoneBook.push({ phone: phone, name: name, email: email });

        return true;
    }

    return false;
};

exports.update = function (phone, name, email) {
    if (phone === undefined || name === undefined) {
        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        let currentEntry = phoneBook[i];
        if (currentEntry.phone === phone) {
            currentEntry.name = name;
            currentEntry.email = getCorrectEmail(email);

            return true;
        }
    }

    return false;
};


exports.findAndRemove = function (query) {
    if (query === '' || typeof (query) !== 'string') {
        return 0;
    }
    let bookLengthBefore = phoneBook.length;
    if (query === '*') {
        phoneBook = [];
    } else {
        phoneBook = phoneBook.filter(isEntryUnsuitable(query));
    }

    return bookLengthBefore - phoneBook.length;
};


exports.find = function (query) {
    if (query === '' || typeof (query) !== 'string') {
        return [];
    }
    if (query === '*') {
        return phoneBook
            .map(entryToString)
            .sort();
    }

    return phoneBook
        .filter(isEntrySuitable(query))
        .map(entryToString)
        .sort();
};

function isEntryUnsuitable(query) {
    return function (entry) {
        return entry.phone.indexOf(query) === -1 &&
            entry.name.indexOf(query) === -1 &&
            entry.email.indexOf(query) === -1;
    };
}

function isEntrySuitable(query) {
    return function (entry) {
        return entry.phone.indexOf(query) !== -1 ||
            entry.name.indexOf(query) !== -1 ||
            entry.email.indexOf(query) !== -1;
    };
}

function entryToString(entry) {
    let match = entry.phone.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    let formattedPhone = `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
    let formattedEmail = (entry.email === '') ? '' : (', ' + entry.email);

    return entry.name + ', ' + formattedPhone + formattedEmail;
}

function getCorrectEmail(email) {
    email = (email === undefined || email === null) ? '' : email;

    return email;
}

exports.importFromCsv = function (csv) {
    return csv.split('\n').length;
};
