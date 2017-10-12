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
        if (isEmpty(name)) {
            throw TypeError;
        }
        if (!isEmpty(phone)) {
            if (phone.match(regexp) === null) {
                throw TypeError;
            }
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
 * Проверяет строку, пустая-ли она.
 * @param {String} str 
 * @returns {Boolean} empty ? true: false
 */
function isEmpty(str) {
    return str === undefined || str === null || str === '';
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
        if (checkExistence(phone, name, email)) {
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
 * Проверка контакта на его наличие в телефонной книге
 * @param {String} phone 
 * @param {String} name 
 * @param {String} email 
 * @returns {Boolean} exist ? true : false
 */
function checkExistence(phone, name, email) {
    for (let contact in phoneBook) {
        if (phoneBook[contact].name === name ||
            phoneBook[contact].phone === phone ||
            phoneBook[contact].email === email) {
            return true;
        }
    }

    return false;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} result
 */
exports.update = function (phone, name, email) {
    if (isEmpty(name)) {
        return false;
    }
    if (phoneBook.length === 0) {
        return false;
    }
    for (let index in phoneBook) {
        if (phoneBook[index].phone === phone) {
            phoneBook[index].name = name;
            phoneBook[index].email = email;

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
    if (phoneBook.length === 0) {
        return 0;
    }
    if (query === '*') {
        return removeAll();
    }
    if (isEmpty(query)) {
        return 0;
    }

    return removeByKey(query);
};

/**
 * Удаление ВСЕХ записей из телефонной книги. Возвращает число удалённых записей.
 * @returns {Integer} number of deleted elements
 */
function removeAll() {
    let deleted = phoneBook.length;
    phoneBook = [];

    return deleted;
}

function removeByKey(query) {
    let deleted = 0;
    for (let i = phoneBook.length - 1; i >= 0; i--) {
        deleted += checkAndDelete(i, query);
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
    if (checkEntry(phoneBook[contact].name, query) || checkEntry(phoneBook[contact].phone, query) ||
    checkEntry(phoneBook[contact].email, query)) {
        phoneBook.splice(contact, 1);

        return 1;
    }

    return 0;
}

/**
 * Проверяет строку на наличие в ней подстроки.
 * @param {*} str
 * @param {*} query
 * @returns {Boolean} result
 */
function checkEntry(str, query) {
    return !isEmpty(str) && str.indexOf(query) !== -1;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array<String>} result
 */
exports.find = function (query) {
    if (phoneBook.length === 0) {
        return [];
    }
    if (query === '*') {
        return getAllContacts();
    }
    if (isEmpty(query)) {
        return [];
    }

    return findByQuery(query).sort();
};

function findByQuery(query) {
    let result = [];
    for (let contact in phoneBook) {
        if (checkEntry(phoneBook[contact].name, query)) {
            result.push(phoneBook[contact].toString());
        } else if (checkEntry(phoneBook[contact].phone, query)) {
            result.push(phoneBook[contact].toString());
        } else if (checkEntry(phoneBook[contact].email, query)) {
            result.push(phoneBook[contact].toString());
        }
    }

    return result;
}

/**
 * @returns {Arrayy<String>} of all contacts
 */
function getAllContacts() {
    let result = [];
    for (let contact in phoneBook) {
        if (!isEmpty(phoneBook[contact].name)) {
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
