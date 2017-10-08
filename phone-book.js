'use strict';


exports.isStar = false;

var phoneBook = [];


exports.add = function (phone, name, email) {
    if (name === undefined) {
        return false;
    }
    if (!/^\d{10}$/.test(String(phone))) {
        return false;
    }
    if (!isUnique(phone)) {
        return false;
    }
    phoneBook.push({ phone: phone, name: name, email: email });

    return true;
};

function isUnique(phone) {
    for (let i = 0; i < phoneBook.length; i++) {
        let currentPhone = phoneBook[i].phone;
        if (currentPhone === phone || currentPhone === undefined || currentPhone === null) {
            return false;
        }
    }

    return true;
}


exports.update = function (phone, name, email) {
    if (name === undefined) {
        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        let currentEntryPhone = phoneBook[i].phone;
        if (currentEntryPhone === phone) {
            phoneBook[i].name = name;
            phoneBook[i].email = (email === undefined) ? '' : email;

            return true;
        }
    }

    return false;
};


exports.findAndRemove = function (query) {
    let len = phoneBook.length;
    if (query === '*') {
        phoneBook = [];

        return len;
    }
    if (query === '') {
        return phoneBook.length;
    }
    phoneBook = phoneBook.filter(isEntryBad(query));

    return len - phoneBook.length;
};


exports.find = function (query) {
    if (query === '*') {
        return phoneBook
            .sort(compareEntry)
            .map(getStringOfEntry);
    }
    if (query === '') {
        return;
    }

    return phoneBook
        .filter(isEntrySuitable(query))
        .sort(compareEntry)
        .map(getStringOfEntry);
};

function isEntryBad(query) {
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

function compareEntry(a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }

    return 0;
}

function getStringOfEntry(entry) {
    let formattedEmail = (entry.email === '') ? '' : (', ' + entry.email);

    return entry.name + ', ' + getFormattedPhone(entry.phone) + formattedEmail;
}

function getFormattedPhone(phone) {
    let match = phone.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);

    return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует

    return csv.split('\n').length;
};
