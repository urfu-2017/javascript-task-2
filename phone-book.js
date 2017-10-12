'use strict';

exports.isStar = true;

const phoneBook = [];
const phoneFormat = new RegExp('\\d{3}\\d{3}\\d{2}\\d{2}');

const createRecord = function (phone, name, email) {
    return { phone: phone, name: name, email: email };
};

const phoneIsCorrect = function (phone) {
    return typeof(phone) === 'string' && phone.match(phoneFormat) !== null;
};

const nameIsCorrect = function (name) {
    return typeof(name) === 'string' && name.length > 0;
};

const isCorrect = function (name, phone) {
    return nameIsCorrect(name) && phoneIsCorrect(phone);
};

const findIndexByProperty = function (propertyName, propertyValue) {
    for (let i = 0; i < phoneBook.length; ++i) {
        if (phoneBook[i][propertyName] === propertyValue) {
            return i;
        }
    }

    return -1;
};

const getFields = function (record) {
    return [record.name, record.phone, record.email];
};

const formatPhone = function (phone) {
    return ('+7 (' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) +
        '-' + phone.slice(6, 8) + '-' + phone.slice(8, 10));
};

let formatRecord = function (record) {
    let fields = [record.name, formatPhone(record.phone)];
    if (typeof(record.email) === 'string' && record.email.length > 0) {
        fields.push(record.email);
    }

    return fields.join(', ');
};

const findIndexesByQuery = function (query) {
    if (typeof(query) !== 'string' || query === '') {
        return [];
    }
    let indexes = [];
    for (let i = 0; i < phoneBook.length; ++i) {
        let queryFound = getFields(phoneBook[i]).some(function (field) {
            return query === '*' || (field !== undefined && field.indexOf(query) !== -1);
        });
        if (queryFound) {
            indexes.push(i);
        }
    }

    return indexes;
};

exports.add = function (phone, name, email) {
    if (!isCorrect(name, phone) || findIndexByProperty('phone', phone) !== -1) {
        return false;
    }
    phoneBook.push(createRecord(phone, name, email));

    return true;
};

exports.update = function (phone, name, email) {
    let indexFound = findIndexByProperty('phone', phone);
    if (!isCorrect(name, phone) || indexFound === -1) {
        return false;
    }
    phoneBook[indexFound] = createRecord(phone, name, email);

    return true;
};

exports.findAndRemove = function (query) {
    let found = findIndexesByQuery(query);
    for (let indexFound of found.reverse()) {
        phoneBook.splice(indexFound, 1);
    }

    return found.length;
};

exports.find = function (query) {
    return findIndexesByQuery(query)
        .map(function (index) {
            return phoneBook[index];
        })
        .sort(function (a, b) {
            return a.name.localeCompare(b.name);
        })
        .map(formatRecord);
};

exports.importFromCsv = function (csv) {
    let countAddedOrUpdated = 0;
    for (let csvLine of csv.split('\n')) {
        let split = csvLine.split(';');
        if (split.length === 2) {
            split.push(undefined);
        }
        if (exports.add(split[1], split[0], split[2]) ||
            exports.update(split[1], split[0], split[2])) {
            countAddedOrUpdated++;
        }
    }

    return countAddedOrUpdated;
};
