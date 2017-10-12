'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook = [];
function verifPhone(phone) {
    if (phone === undefined) {
        return false;
    }
    if (phone === null) {
        return false;
    }
    if (!/^\d{10}$/.test(phone)) {
        return false;
    }

    return true;
}
function verifName(name) {
    if (name === undefined) {
        return false;
    }
    if (name === null) {
        return false;
    }
    if (name.length === 0) {
        return false;
    }
    if (typeof name !== 'string') {
        return false;
    }

    return true;
}
function verifEmail(email) {
    if (email === undefined) {
        return true;
    }
    if (typeof email === 'string') {
        return true;
    }
    if (email.length === 0) {
        return true;
    }
    if (email === null) {
        return true;
    }

    return false;
}
function formatPhoneNumber(newPhone) {
    var format = '+7 (' + newPhone.phone.slice(0, 3) + ') ' + newPhone.phone.slice(3, 6) + '-' +
    newPhone.phone.slice(6, 8) + '-' + newPhone.phone.slice(8, 10);

    return format;
}
function outputInfopmation(newPhone) {
    var newMassive = [];
    if (newPhone.email === undefined) {
        newMassive = [newPhone.name, formatPhoneNumber(newPhone)];
    } else {
        newMassive = [newPhone.name, formatPhoneNumber(newPhone), newPhone.email];
    }

    return newMassive.join(', ');
}
function testIndex(query, newPhone) {

    return newPhone.phone.indexOf(query) !== -1 ||
    newPhone.name.indexOf(query) !== -1 || newPhone.email.indexOf(query) !== -1;
}
function nameSort(firstName, secondName) {
    if (firstName.name > secondName.name) {
        return 1;
    }
    if (firstName.name < secondName.name) {
        return -1;
    }

    return 0;
}
function parametrs(query, name, phone, email) {
    return phone !== undefined && phone.indexOf(query) !== -1 ||
    name !== undefined && name.indexOf(query) !== -1 ||
    email !== undefined && email.indexOf(query) !== -1;
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.add = function (phone, name, email) {
    var newPhone = {};
    if (verifEmail(email) && verifName(name) && verifPhone(phone)) {
        newPhone.phone = phone;
        newPhone.name = name;
        newPhone.email = email;
    } else {
        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {

            return false;
        }
    }
    phoneBook.push(newPhone);

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.update = function (phone, name, email) {
    if (!verifEmail(email) || !verifName(name) || !verifPhone(phone)) {
        return false;
    }
    for (let newPhone of phoneBook) {
        if (newPhone.phone === phone) {
            newPhone.name = name;
            newPhone.email = email;
        }
    }

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

exports.findAndRemove = function (query) {
    let counter = 0;
    if (query.length === 0 || typeof query !== 'string') {
        return counter;
    }
    if (query === '*') {
        counter = phoneBook.length;
        phoneBook.splice(0, phoneBook.length);

        return counter;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (parametrs(query, phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email)) {
            phoneBook.splice(i, 1);
            i--;
            counter++;
        }

    }

    return counter;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

exports.find = function (query) {
    if (query.length === 0 || typeof query !== 'string') {
        return [];
    }
    if (query === '*') {
        phoneBook.sort(nameSort);
        var sortInform = [];
        for (let newPhone of phoneBook) {
            var newMassive = [];
            newMassive = outputInfopmation(newPhone);
            sortInform.push(newMassive);
        }

        return sortInform;
    }
    var searchMassive = phoneBook.filter(function (newPhone) {

        return testIndex(query, newPhone);
    });

    return searchMassive.map(outputInfopmation).sort(nameSort);
};

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
    let count = 0;
    for (let i of csv.split('\n')) {
        let [name, phone, email] = i.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            count++;
        }
    }

    return count;
};
