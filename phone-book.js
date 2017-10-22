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
let phoneTest = /^[0-9]{10}$/;

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

function repeatPhone(phone) {
    let listRepeat = phoneBook.filter(entry => entry.phone === phone);

    return (listRepeat.length !== 0);
}

function assContact(phone, name, email) {
    let contact = {};
    if (typeof email !== 'string') {
        contact.name = name;
        contact.phone = phone;

        return contact;
    }
    contact.name = name;
    contact.phone = phone;
    contact.email = email;

    return contact;
}

exports.add = function (phone, name, email) {
    if (!phoneTest.test(phone) || !name) {
        return false;
    }
    if (repeatPhone(phone)) {
        return false;
    }
    phoneBook.push(assContact(phone, name, email));

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.update = function (phone, name, email) {
    if (!phoneTest.test(phone) || !name) {
        return false;
    }
    let processed = phoneBook.filter(entry => entry.phone !== phone);
    if (processed !== phoneBook) {
        let contact = assContact(phone, name, email);
        processed.push(contact);
        phoneBook = processed;

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

function search(contact, query) {
    let phone = contact.phone;
    let name = contact.name;
    let email = contact.email;
    if (!email && phone.indexOf(query) < 0 && name.indexOf(query) < 0) {
        return -1;
    }
    if (phone.indexOf(query) < 0 && name.indexOf(query) < 0 && email.indexOf(query) < 0) {
        return -1;
    }

    return 0;
}

exports.findAndRemove = function (query) {
    let quantityContact = phoneBook.length;
    if (!query) {
        return 0;
    }
    if (query === '*') {
        phoneBook = [];

        return quantityContact;
    }
    let processed = phoneBook.filter(entry => search(entry, query) === -1);
    phoneBook = processed;

    return quantityContact - processed.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

function show(phone) {
    return '+7 (' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' +
        phone.slice(6, 8) + '-' + phone.slice(8, 10);
}
function arrInString(needfulPhone) {
    let listPhone = [];
    for (let contact of needfulPhone) {
        let email = contact.email;
        if (!email) {
            listPhone.push(contact.name + ', ' + show(contact.phone));
        } else {
            listPhone.push(contact.name + ', ' + show(contact.phone) + ', ' + contact.email);
        }
    }

    return listPhone;
}

exports.find = function (query) {
    if (!query) {
        return [];
    }
    if (query === '*') {
        return arrInString(phoneBook).sort();
    }

    return arrInString(phoneBook.filter(entry => search(entry, query) !== -1)).sort();
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
    let entries = csv.split('\n');
    let counter = 0;
    for (let entry of entries) {
        let contact = entry.split(';');
        if (exports.add(contact[1], contact[0], contact[2]) ||
            exports.update(contact[1], contact[0], contact[2])) {
            counter ++;
        }
    }

    return counter;
};


