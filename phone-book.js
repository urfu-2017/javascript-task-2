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

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Bool}
 */
exports.add = function (phone, name, email) {
    if (!checkPhoneAndName(phone, name) ||
        phoneBook.some(entry => entry.phone === phone)) {
        return false;
    }

    const entry = {
        phone,
        name,
        'email': typeOfString(email) ? email : null
    };

    phoneBook.push(entry);

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Bool}
 */
exports.update = function (phone, name, email) {
    if (!checkPhoneAndName(phone, name) ||
        !phoneBook.some(entry => entry.phone === phone)) {
        return false;
    }

    const index = phoneBook.findIndex(entry => entry.phone === phone);
    phoneBook[index].name = name;
    phoneBook[index].email = typeOfString(email) && email !== '' ? email : null;

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    const found = queryPhoneBook(query);

    phoneBook = phoneBook.filter(entry => !found.includes(entry));

    return found.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {[Entry]}
 */
exports.find = function (query) {
    return queryPhoneBook(query)
        .map(entryToString)
        .sort();
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    if (!typeOfString(csv)) {
        return 0;
    }

    let parsed = csv.split('\n').map(line => line.split(';'));

    return parsed.reduce((accumulator, entry, _0, _1) => { // eslint-disable-line no-unused-vars
        let [name, phone, email] = entry;

        return accumulator +
            (exports.add(phone, name, email) || exports.update(phone, name, email) ? 1 : 0);
    }, 0);
};

function checkPhoneAndName(phone, name) {
    return typeOfString(phone) && /^\d{10}$/i.test(phone) &&
        typeOfString(name) && name !== '';
}

function typeOfString(variable) {
    return variable && (typeof variable === 'string' || variable instanceof String);
}

function queryPhoneBook(query) {
    if (!typeOfString(query) || query === '') {
        return [];
    }

    if (query === '*') {
        return phoneBook;
    }

    return phoneBook.filter(entry => {
        return Object.values(entry).some(value => {
            return value && value.includes(query);
        });
    });
}

function entryToString(entry) {
    var result = [];

    result.push(entry.name);

    const phoneString = `+7 (${entry.phone.slice(0, 3)}) ` +
        `${entry.phone.slice(3, 6)}-${entry.phone.slice(6, 8)}-${entry.phone.slice(8)}`;
    result.push(phoneString);

    if (typeOfString(entry.email)) {
        result.push(entry.email);
    }

    return result.join(', ');
}
