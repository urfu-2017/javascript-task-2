'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = [];

//  Добавление записи в телефонную книгу

let isNewPhone = (phone) => {
    if (phoneBook.length === 0) {
        return true;
    }

    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i][0] === phone) {
            return false;
        }
    }

    return true;
};

let isCorrectPhone = (phone) => {
    return typeof phone === 'string' && /^(\d){10}$/.test(phone);
};

let isCorrectNameAndEmail = (name, email) => {
    if (typeof name === 'string' && name.length !== 0) {
        if ((typeof email === 'string' && email.length !== 0 && email.indexOf('@') !== -1) ||
        email === undefined) {

            return true;

        }
    }

    return false;
};

exports.add = function (phone, name, email) {
    if (isCorrectNameAndEmail(name, email) && isCorrectPhone(phone)) {
        if (isNewPhone(phone)) {
            phoneBook.push([phone, name, email]);

            return true;
        }
    }

    return false;
};

//  Обновление записи в телефонной книге
exports.update = function (phone, name, email) {
    if (!isCorrectPhone(phone) || !isCorrectNameAndEmail(name, email)) {

        return false;
    }

    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i][0] === phone) {
            phoneBook[i] = [phone, name, email];

            return true;
        }

    }

    return false;
};

let isSubstr = (arr, str) => {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined && arr[i].indexOf(str) !== -1) {

            return true;
        }
    }

    return false;
};

//  Удаление записей по запросу из телефонной книги
exports.findAndRemove = function (query) {
    const newPhoneBook = [];
    let removed = 0;

    if (query === '' || typeof query !== 'string') {
        return removed;
    }

    if (query === '*') {
        removed = phoneBook.length;
        phoneBook = [];

        return removed;
    }

    for (let i = 0; i < phoneBook.length; i++) {
        if (!isSubstr(phoneBook[i], query)) {
            newPhoneBook.push(phoneBook[i]);
        }
    }

    removed = phoneBook.length - newPhoneBook.length;
    phoneBook = newPhoneBook;

    return removed;
};

let formatPhoneBook = (itemPhoneBook) => {
    let formatedItem = '';
    let phone = `+7 (${itemPhoneBook[0].slice(0, 3)}) ${itemPhoneBook[0].slice(3, 6)}-${itemPhoneBook[0].slice(6, 8)}-${itemPhoneBook[0].slice(8, 10)}`; // eslint-disable-line max-len

    if (itemPhoneBook[2] !== undefined) {
        formatedItem = itemPhoneBook[1] + ', ' + phone + ', ' + itemPhoneBook[2];
    } else {
        formatedItem = itemPhoneBook[1] + ', ' + phone;
    }

    return formatedItem;
};

let searchAllContacts = () => {
    const findPhoneBook = [];
    for (let i = 0; i < phoneBook.length; i++) {
        findPhoneBook.push(formatPhoneBook(phoneBook[i]));
    }

    return findPhoneBook.sort();
};

//  Поиск записей по запросу в телефонной книге
exports.find = function (query) {
    const findPhoneBook = [];
    if (typeof(query) !== 'string' || query === '') {
        return findPhoneBook.sort();
    }

    if (query === '*') {
        return searchAllContacts();
    }

    for (let i = 0; i < phoneBook.length; i++) {
        if (isSubstr(phoneBook[i], query)) {
            findPhoneBook.push(formatPhoneBook(phoneBook[i]));
        }
    }

    return findPhoneBook.sort();
};

//  Импорт записей из csv-формата
exports.importFromCsv = function (csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует
    let count = 0;

    const csvSplit = csv.split('\n');

    for (let i = 0; i < csvSplit.length; i++) {
        const data = csvSplit[i].split(';');
        const name = data[0];
        const phone = data[1];
        const email = data[2];

        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            count++;
        }

    }

    return count;
};
