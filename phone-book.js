'use strict';

exports.isStar = true;

var phoneBook = {};

exports.add = function (phone, name, email) {
    if (!checkName(name) || !checkPhone(phone)) {
        return false;
    }
    phoneBook[phone] = {};
    phoneBook[phone].name = name;
    phoneBook[phone].email = email;

    return true;
};

function checkPhone(phone) {
    var regExp = new RegExp('\\d{10}');
    if (!regExp.test(phone) || phoneBook.hasOwnProperty(phone)) {
        return false;
    }

    return true;
}

function checkName(name) {
    if (name === '' || name === undefined) {
        return false;
    }

    return true;
}

exports.update = function (phone, name, email) {
    if (!checkName(name) || !phoneBook.hasOwnProperty(phone)) {
        return false;
    }
    phoneBook[phone].name = name;
    phoneBook[phone].email = email;

    return true;
};

exports.findAndRemove = function (query) {
    let arrayOfRecords = findRecords(query);
    for (let record of arrayOfRecords) {
        delete phoneBook[record[1]];
    }

    return arrayOfRecords.length;
};

exports.find = function (query) {
    let result = [];
    if (query === '') {
        return result;
    } else if (query === '*') {
        result = findRecords('');
    } else {
        result = findRecords(query);
    }
    sortByFirstItem(result);
    for (let data of result) {
        data[1] = formatPhone(data[1]);
        result[result.indexOf(data)] = data.join(', ');
    }

    return result;
};

function findRecords(query) {
    let array = [];
    for (let phone in phoneBook) {
        if (phoneBook.hasOwnProperty(phone)) {
            checkOccurrences(query, phone, array);
        }
    }

    return array;
}

function checkOccurrences(query, phone, array) {
    if (phone.indexOf(query) !== -1 ||
    phoneBook[phone].name.indexOf(query) !== -1 ||
    (phoneBook[phone].email !== undefined && phoneBook[phone].email.indexOf(query) !== -1)) {
        if (phoneBook[phone].email !== undefined) {
            array.push([phoneBook[phone].name, phone, phoneBook[phone].email]);
        } else {
            array.push([phoneBook[phone].name, phone]);
        }
    }
}

function sortByFirstItem(array) {
    array.sort(function (a, b) {
        if (a[0] > b[0]) {
            return 1;
        } else if (a[0] < b[0]) {
            return -1;
        }

        return 0;
    });
}

function formatPhone(phone) {
    phone = phone.split('');
    phone.splice(0, 0, '+7 (');
    phone.splice(4, 0, ') ');
    phone.splice(8, 0, '-');
    phone.splice(11, 0, '-');

    return phone.join('');
}

exports.importFromCsv = function (csv) {
    let count = 0;
    let data = csv.split('\n');
    for (let contact of data) {
        let info = contact.split(';');
        if (!exports.add(info[1], info[0], info[2])) {
            count += exports.update(info[1], info[0], info[2]);
        } else {
            count += 1;
        }
    }

    return count;
};
