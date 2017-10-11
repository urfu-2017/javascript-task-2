'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = {};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    if (!/\d{10}/.test(phone) || phone in phoneBook || !isString(name) || name === '') {
        return false;
    }
    phoneBook[phone] = {
        name,
        email
    };

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    if (!(phone in phoneBook) || !name) {
        return false;
    }
    phoneBook[phone] = {
        name,
        email
    };

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    const numbers = findNumbers(query);
    numbers.forEach((number) => delete phoneBook[number]);

    return numbers.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Number}
 */
exports.find = function (query) {
    return findNumbers(query)
        .map((number) =>[phoneBook[number].name, formatNumber(number), phoneBook[number].email])
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((values) => values.filter(isString).join(', '));
};

function findNumbers(query) {
    if (query === '') {
        return [];
    }
    if (query === '*') {
        return Object.keys(phoneBook);
    }

    const entries = Object.entries(phoneBook);
    let results = [];
    for (let [phone, { name, email }] of entries) {
        const values = [name, phone, email];
        if (values.filter(isString).some((v) => v.indexOf(query) !== -1)) {
            results.push(phone);
        }
    }

    return results;
}

function formatNumber(number) {
    return `+7 (${number.slice(0, 3)}) ` +
        `${number.slice(3, 6)}-${number.slice(6, 8)}-${number.slice(8, 10)}`;
}

function isString(str) {
    return typeof str === 'string';
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
    return csv.split('\n')
        .map((line) => {
            const [name, phone, email] = line.split(';');

            return exports.add(phone, name, email) || exports.update(phone, name, email);
        })
        .filter((result) => result)
        .length;
};
