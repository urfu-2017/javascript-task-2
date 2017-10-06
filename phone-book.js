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
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    return tryAddRecord(phone, name, email);
};

function tryAddRecord(phone, name, email) {
    if (!(isValidPhone(phone) && isValidName(name)) || phoneBook.hasOwnProperty(phone)) {
        return false;
    }
    let record = {
        name,
        email
    };
    phoneBook[phone] = record;

    return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    return tryUpdateRecord(phone, name, email);
};

function tryUpdateRecord(phone, name, email) {
    if (!phoneBook.hasOwnProperty(phone) || !isValidName(name)) {
        return false;
    }
    let updatedName = isValidName(name) ? name : phoneBook[phone].name;
    let record = {
        name: updatedName,
        email
    };
    phoneBook[phone] = record;

    return true;
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Int}
 */
exports.findAndRemove = function (query) {
    let removedCount = 0;
    for (let [phone, { name, email }] of Object.entries(phoneBook)) {
        let summary = [name, phone, email, '*'];
        if (paramsOccurencyFound(summary, query)) {
            delete phoneBook.phone;
            removedCount++;
        }
    }

    return removedCount;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    if (query === '' || query === undefined) {
        return [];
    }
    let searchResult = [];
    for (let [phone, { name, email }] of Object.entries(phoneBook)) {
        let summary = [name, phone, email, '*'];
        if (paramsOccurencyFound(summary, query)) {
            let formattedOutput = formatOutput(name, phone, email);
            searchResult.push({ name, formattedOutput });
        }
    }
    let sortedResult = searchResult.sort((a, b) => a.name > b.name).map(x=>x.formattedOutput);

    return sortedResult;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} name
 * @param {String} phone
 * @param {String} email
 * @returns {String}
 */
function formatOutput(name, phone, email) {
    let baseOutput = `${name}, ${formatNumber(phone)}`;
    let formattedOutput = email === undefined
        ? baseOutput
        : baseOutput + `, ${email}`;

    return formattedOutput;
}

/**
 * Поиск вхождений запроса в запись
 * @param {Array} summary
 * @param {String} query
 * @returns {Boolean}
 */
function paramsOccurencyFound(summary, query) {
    if (query === '') {
        return false;
    }
    for (let param of summary) {
        if (param !== undefined && param.indexOf(query) >= 0) {
            return true;
        }
    }

    return false;
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
    var records = csv.split('\n');
    let newRecordsCount = 0;
    let updatedRecordsCount = 0;
    for (var i = 0; i < records.length; i++) {
        let [name, phone, email] = records[i].split(';');
        if (tryAddRecord(phone, name, email)) {
            newRecordsCount++;
        } else if (tryUpdateRecord(phone, name, email)) {
            updatedRecordsCount++;
        }
    }

    return newRecordsCount + updatedRecordsCount;
};

function isValidName(name) {
    return name !== undefined && /.+$/.test(name);
}

function isValidPhone(phone) {
    return /^([0-9]){10}$/.test(phone);
}

function formatNumber(number) {
    return `+7 (${number.slice(0, 3)}) ` +
        `${number.slice(3, 6)}-` +
        `${number.slice(6, 8)}-` +
        `${number.slice(8)}`;
}
