'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

/**
 * Телефонная книга
 */

var phoneBook = [];

// exports.phoneBook = () => phoneBook;
/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email = '') { // eslint-disable-line complexity
    if (name === '' || name === undefined) {
        return false;
    }

    if (phone.length !== 10 || isNaN(Number(phone))) {
        return false;
    }

    for (var element of phoneBook) {
        if (element.phone === phone) {
            return false;
        }
    }

    var contact = {
        phone: phone,
        name: name,
        email: email
    };
    phoneBook.push(contact);

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email = '') {
    if (name === '' || name === undefined) {
        return false;
    }
    for (var element of phoneBook) {
        if (element.phone === phone) {
            element.name = name;
            element.email = email;

            return true;
        }
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    if (query === '') {
        return 0;
    }

    if (query === '*') {
        var current = phoneBook.length;
        phoneBook = [];

        return current;
    }

    var removePhoneBook = [];

    for (var element of phoneBook) {
        if (element.phone.indexOf(query) === -1 &&
            element.name.indexOf(query) === -1 &&
            element.email.indexOf(query) === -1
        ) {
            removePhoneBook.push(element);
        }
    }

    var count = phoneBook.length - removePhoneBook.length;
    phoneBook = removePhoneBook;

    return count;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) { // eslint-disable-line complexity
    if (query === '') {
        return [];
    }
    var newPhoneBook = [];
    for (var element of phoneBook) {
        if (element.phone.indexOf(query) !== -1 ||
            element.name.indexOf(query) !== -1 ||
            element.email.indexOf(query) !== -1 ||
            query === '*'
        ) {
            var p = element.phone;
            var phone = `+7 (${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6, 8)}-${p.slice(8, 10)}`;
            var contactString = `${element.name}, ${phone}, ${element.email}`;

            if (element.email === '') { // eslint-disable-line max-depth
                contactString = `${element.name}, ${phone}`;
            }
            newPhoneBook.push(contactString);
        }
    }
    function compareName(a, b) {
        return a > b;
    }
    newPhoneBook.sort(compareName);

    return newPhoneBook;
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
// exports.importFromCsv = function (csv) {
//     // Парсим csv
//     // Добавляем в телефонную книгу
//     // Либо обновляем, если запись с таким телефоном уже существует

//     // return csv.split('\n').length;
