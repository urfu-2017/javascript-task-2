'use strict';

exports.isStar = true;

var phoneBook = {};
var phoneReg = new RegExp('^[0-9]{10}$');

function checkPhone(number) {
    if (phoneReg.exec(number)) {
        return true;
    }

    return false;
}

function checkName(name) {
    if (name !== ' ' && name !== undefined && name !== null) {
        return true;
    }

    return false;

}

function transformPhoneAndEmail(number, email) {
    let phone = '+7 (' + number.slice(0, 3) + ') ' + number.slice(3, 6) +
    '-' + number.slice(6, 8) + '-' + number.slice(8, 10);
    if (email !== null && email !== undefined) {
        phone += ', ' + email;
    }

    return phone;
}

function checkRecordByPhone(number) {
    if (phoneBook[number]) {
        return true;
    }

    return false;
}

exports.add = function (phone, name, email) {
    if (checkPhone(phone) && checkName(name) && !checkRecordByPhone(phone)) {
        phoneBook[phone] = { name, email };

        return true;
    }

    return false;
};

exports.update = function (phone, name, email) {
    if (checkRecordByPhone) {
        phoneBook[phone] = { name, email };

        return true;
    }

    return false;
};

exports.findAndRemove = function (query) {
    let deleted = [];
    if (query === '*') {
        deleted = Object.keys(phoneBook);
        phoneBook = {};

        return deleted.length;
    }
    if (query !== '') {
        deleted = Object.keys(findRecords(query));
        for (let i = 0; i < deleted.length; i++) {
            delete phoneBook[deleted[i]];
        }

        return deleted.length;
    }
    if (query === '') {
        return 0;
    }

};

exports.find = function (query) {
    let result = [];
    let records = findRecords(query);
    let phoneNumbers = Object.keys(records);
    for (let phone of phoneNumbers) {
        let contacts = [];
        contacts.push(records[phone].name);
        contacts.push(transformPhoneAndEmail(phone, records[phone].email));
        result.push(contacts.join(', '));
    }

    return result.sort();

};

function findRecords(query) {
    let result = {};
    if (query === '*') {
        result = phoneBook;
    }
    if (query !== '') {
        result = recordsInBook(query);
    } else {
        result = {};
    }

    return result;
}

function recordsInBook(query) {
    let records = {};
    for (let contact of Object.keys(phoneBook)) {
        if (checkRecord(phoneBook[contact], query) || contact.indexOf(query)) {
            records[contact] = {
                name: phoneBook[contact].name,
                email: phoneBook[contact].email };
        }
    }

    return records;
}

function checkRecord(record, query) {
    if ((record.name.indexOf(query) >= 0) ||
        ((record.email !== undefined) && (record.email.indexOf(query) >= 0))) {

        return true;
    }

    return false;
}

exports.importFromCsv = function (csv) {
    let records = csv.split('\n');
    let updateRecords = 0;
    for (const record of records) {
        let [name, phone, email] = record.split(';');
        if (checkPhone(phone) && checkName(name) &&
            (exports.update(phone, name, email) || exports.add(phone, name, email))) {
            updateRecords++;
        }
    }

    return updateRecords;
};

