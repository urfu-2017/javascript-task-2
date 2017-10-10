'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Регулярка для проверки номера телефона
 */
var regexp = /^[0-9]{10}$/;

/**
 * Телефонная книга
 */
var phoneBook = [];

/**
 * Запись в телефонной книге
 */
class Contact {
    constructor(phone, name, email) {
        if (name === undefined || name === null || name === '') {
            throw Error('1');
        }
        if (phone.match(regexp) === null) {
            throw Error('2');
        }
        this.phone = phone;
        this.name = name;
        this.email = email;
    }

    toString() {
        let phone = '+7 (' + this.phone.substr(0, 3) + ') ' + this.phone.substr(3, 3) + '-' +
            this.phone.substr(6, 2) + '-' + this.phone.substr(8, 2);
        if (this.email === undefined) {
            return this.name + ', ' + phone;
        }

        return this.name + ', ' + phone + ', ' + this.email;
    }
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} result
 */
exports.add = function (phone, name, email) {
    if (phoneBook.length > 0) {
        if (!checkContact(phone, name, email)) {
            return false;
        }
    }
    try {
        var contact = new Contact(phone, name, email);
        phoneBook.push(contact);
    } catch (error) {
        return false;
    }

    return true;
};

/**
 * Check contact for existing in phone book
 * @param {String} phone 
 * @param {String} name 
 * @param {String} email 
 * @returns {Boolean} exist ? true : false
 */
function checkContact(phone, name, email) {
    for (let contact in phoneBook) {
        if (phoneBook[contact].name === name ||
            phoneBook[contact].phone === phone ||
            phoneBook[contact].email === email) {
            return false;
        }
    }

    return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} result
 */
exports.update = function (phone, name, email) {
    if (name === null || name === '') {
        return false;
    }
    for (let contact in phoneBook) {
        if (phoneBook[contact].phone === phone) {
            phoneBook[contact].name = name;
            phoneBook[contact].email = email;

            return true;
        }
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Integer} number of deleted elements
 */
exports.findAndRemove = function (query) {
    let deleted = 0;
    if (query === '*') {
        return removeAll();
    }
    deleted = removeByKey(query);

    return deleted;
};

/**
 * Removes all elements and returns number of deleted items
 * @returns {Integer} number of deleted elements
 */
function removeAll() {
    let deleted = phoneBook.length;
    phoneBook = [];

    return deleted;
}

function removeByKey(query) {
    let deleted = 0;
    for (let contact in phoneBook) {
        if (contact < phoneBook.length) {
            deleted = checkAndDelete(contact, query);
        }
    }

    return deleted;
}

/**
 * Check contact for matching query and deletes from the phone book if match
 * @param {Integer} contact
 * @param {String} query
 * @returns {Integer} numOfDeleted
 */
function checkAndDelete(contact, query) {
    let deleted = 0;
    if (phoneBook[contact].name.match(query) ||
    (phoneBook[contact].phone !== undefined && phoneBook[contact].phone.match(query)) ||
    (phoneBook[contact].email !== undefined && phoneBook[contact].email.match(query))) {
        phoneBook.splice(contact, 1);
        deleted = contact === phoneBook.length ? deleted + 1
            : deleted + 1 + checkAndDelete(contact, query);
    }

    return deleted;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array<String>} result
 */
exports.find = function (query) {
    let result = [];
    if (query === '*') {
        return getAllContacts();
    }
    for (let contact in phoneBook) {
        if (phoneBook[contact].name.match(query) !== null) {
            result.push(phoneBook[contact].toString());
        } else if (!phoneBook[contact].phone !== undefined &&
            phoneBook[contact].phone.match(query) !== null) {
            result.push(phoneBook[contact].toString());
        } else if (!phoneBook[contact].email !== undefined &&
            phoneBook[contact].email.match(query) !== null) {
            result.push(phoneBook[contact].toString());
        }
    }

    return result.sort();
};

/**
 * @returns {Arrayy<String>} of all contacts
 */
function getAllContacts() {
    let result = [];
    for (let contact in phoneBook) {
        if (phoneBook[contact].name !== undefined) {
            result.push(phoneBook[contact].toString());
        }
    }

    return result.sort();
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
    let contacts = csv.split('\n');
    let added = 0;
    for (let contact of contacts) {
        let tokens = contact.split(';');
        let name = tokens[0];
        let phone = tokens[1];
        let email = tokens[2];
        if (this.add(phone, name, email)) {
            added += 1;
        } else if (this.update(phone, name, email)) {
            added += 1;
        }
    }

    return added;
};
