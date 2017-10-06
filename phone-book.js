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
 */

exports.add = function (phone, name, email) {
    if (!inputValidate(phone, name, email)) {
        return false;
    }
    for (const element of phoneBook) {
        if (element.phone === phone) {
            return false;
        }
    }
    const note = {
        phone,
        name,
        email
    };
    phoneBook.push(note);

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.update = function (phone, name, email) {
    if (!inputValidate(phone, name, email)) {
        return false;
    }
    for (const element of phoneBook) {
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
 */

exports.findAndRemove = function (query) {
    let deleteIndexArray = [];
    if (query === '') {
        return 0;
    }
    let counter = 0;
    for (const { phone, name, email } of phoneBook) {
        let note = finder(query, phone, name, email);
        if (Boolean(note) === true) {
            deleteIndexArray.push(counter);
        }
        counter += 1;
    }

    return deleter(deleteIndexArray);
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

exports.find = function (query) {
    let findArray = [];
    if (query === '') {
        return findArray;
    }
    for (const { phone, name, email } of phoneBook) {
        let note = finder(query, phone, name, email);
        if (Boolean(note) === true) {
            findArray.push(note);
        }
    }

    return findArray.sort();
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

    return csv.split('\n').length;
};

function finder(query, phone, name, email) {
    query = query.replace('*', '');
    if (phone.indexOf(query) !== -1 ||
        name.indexOf(query) !== -1 ||
        (email && email.indexOf(query) !== -1)) {
        return (`${name}, +7 (${phone.slice(0, 3)})` +
        `${phone.slice(3, 6)}-${phone.slice(6, 8)}-` +
        `${phone.slice(8, 10)}${email ? ', ' + email : ''}`);
    }

    return null;
}

function deleter(array) {
    for (const item of array) {
        phoneBook.splice(item - array.indexOf(item), 1);
    }

    return array.length;
}

function inputValidate(phone, name) {
    if (Boolean(phone) && Boolean(name)) {
        if (Number(phone) && phone.length === 10) {
            return true;
        }
    }

    return false;
}

