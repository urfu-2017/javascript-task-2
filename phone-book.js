'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

/**
 * Телефонная книга
 */
var phoneBook = {};
const PHONE_REGEX = /^(\d{3})(\d{3})(\d{2})(\d{2})$/;

function isCorrect(phone, name) {
    return PHONE_REGEX.test(phone) && name;
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {bool}
 */
exports.add = function (phone, name, email) {
    if (isCorrect(phone, name) && !(phone in phoneBook)) {
        phoneBook[phone] = { name, email };

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {bool}
 */
exports.update = function (phone, name, email) {
    if (isCorrect(phone, name) && phone in phoneBook) {
        phoneBook[phone] = { name, email };

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    let toRemove = __find(query);
    toRemove.forEach(function (entry) {
        delete phoneBook[entry.number];
    });

    return toRemove.length;


};

function isContainQuery(number, name, email, query) {
    let args = [...arguments].slice(0, 3);
    let out = args.some(function (arg) {
        return arg !== undefined && arg.indexOf(query) >= 0;
    }
    );

    return out;
}

function __find(query) {
    if (query === '') {
        return [];
    }
    if (query === '*') {
        query = '';
    }
    let numbers = Object.keys(phoneBook);
    let out = [];
    numbers.forEach(function (number) {
        let name = phoneBook[number].name;
        let email = phoneBook[number].email;
        if (isContainQuery(number, name, email, query)) {
            out.push({ number, name, email });
        }
    }
    );

    return out;

}

function formatEntry(entry) {
    if (entry.email === undefined) {
        entry.email = '';
    } else {
        entry.email = ', ' + entry.email;
    }
    let parcedNumber = entry.number.match(PHONE_REGEX);

    return `${entry.name}, +7 (${parcedNumber[1]})\
 ${parcedNumber[2]}-${parcedNumber[3]}-${parcedNumber[4]}${entry.email}`;

}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    let out = __find(query);
    out.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }

        return 0;
    });

    return out.map(formatEntry);
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
