'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook = {};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

const correctNumber = /\d{10}/;


function allOrNot(query) {

    if (query === '*') {
        return '';
    }

    return query;
}


function isDataCorrect(number, name) {
    return correctNumber.test(number) && name !== undefined;
}

function checkEmail(email) {
    if (email === undefined) {
        email = '';
    }

    return email;
}

// Преобразует телеонный номер в нужный вид
function transfomrNumber(number) {

    return '+7 (' + number.slice(0, 3) +
        ') ' + number.slice(3, 6) + '-' +
        number.slice(6, 8) + '-' + number.slice(8, 10);
}

function correctInfo(key) {
    let email;

    if (phoneBook[key].email === '') {
        email = '';
    } else {
        email = ', ' + phoneBook[key].email;
    }

    return phoneBook[key].name + ', ' + transfomrNumber(key) + email;
}

exports.add = function (phone, name, email) {
    if (!isDataCorrect(phone, name)) {
        return false;
    }

    // Существует ли запись
    if (typeof phoneBook[phone] === 'object') {
        return false;
    }
    email = checkEmail(email);

    phoneBook[phone] = { name: name, email: email };

    return true;
};

/*
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.update = function (phone, name, email) {
    if (!isDataCorrect(phone, name) || phoneBook[phone !== 'object']) {
        return false;
    }
    email = checkEmail(email);
    phoneBook[phone] = { name: name, email: email };

    return true;
};

/*
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
exports.findAndRemove = function (query) {

    let keys = Object.keys(phoneBook);
    let del = exports.find(query);
    let delStr = del.join();

    if (typeof query !== 'string' || query === '') {
        return 0;
    }

    if (query === '*') {
        phoneBook = {};

        return keys.length;
    }


    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (delStr.indexOf(phoneBook[key].name) + 1) {
            delete phoneBook[key];
        }
    }


    return del.length;
};

/*
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function (query) {
    let keys = Object.keys(phoneBook);
    let result = [];

    if (query === '') {
        return 0;
    }

    query = allOrNot(query);


    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (key.indexOf(query) + 1 || phoneBook[key].name.indexOf(query) + 1 ||
            phoneBook[key].email.indexOf(query) + 1) {
            result[i] = correctInfo(key);
        }
    }

    return result.sort();
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let persons = csv.split('\n');
    let count = 0;
    for (let i = 0; i < persons.length; i++) {
        let person = persons[i].split(';');
        if (exports.update(person[1], person[0], person[2]) ||
            exports.add(person[1], person[0], person[2])) {
            count ++;
        }
    }

    return count;
};
