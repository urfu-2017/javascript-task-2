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
exports.print = function () {
    console.info(phoneBook.map(transformRecordToString));
};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    let record = { phone: phone, name: name, email: email };
    if (!recordIsValid(record) || bookContainsRecord(record)) {
        return false;
    }
    phoneBook.push(record);

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
    let record = { phone, name, email };
    if (!recordIsValid(record) || !bookContainsRecord(record)) {
        return false;
    }
    let oldRecord = extractRecordByPhone(phone);
    oldRecord.name = name;
    oldRecord.email = email;

    return true;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    let extractedValues = extractValuesByQuery(query).slice();
    if (extractedValues.length === 0) {
        return [];
    }

    return extractedValues.sort(compareRecords).map(transformRecordToString);
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} number of deleted elements
 */
exports.findAndRemove = function (query) {
    let values = extractValuesByQuery(query).slice();
    for (let value of values) {
        deleteElement(value);
    }

    return values.length;
};

function recordIsValid(record) {
    return phoneIsvalid(record.phone) && stringIsValid(record.name);
}

function phoneIsvalid(phone) {
    let reg = /^\d{10}$/;

    return reg.test(phone);
}

function bookContainsRecord(record) {
    return phoneBook.some(entry => entry.phone === record.phone);
}

function extractRecordByPhone(phone) {
    return phoneBook.find(x => x.phone === phone);
}

function deleteElement(value) {
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === value.phone) {
            phoneBook.splice(i, 1);
            break;
        }
    }
}

function extractValuesByQuery(query) {
    if (!stringIsValid(query)) {
        return [];
    }
    if (query === '*') {
        return phoneBook;
    }

    return phoneBook
        .filter(rec => Object.keys(rec).map(key => rec[key])
            .some(val => stringIsValid(val) && val.indexOf(query) !== -1));
}

function stringIsValid(string) {
    return typeof string === 'string' && string !== null &&
        string !== undefined && string.toString() !== '';
}

function transformPhoneNumber(record) {
    let reg = /(\d{3})(\d{3})(\d\d)(\d\d)/;
    let phoneParts = reg.exec(record.phone);
    if (phoneParts === null) {
        throw new RangeError('Wrong phone format');
    }
    let phone = `+7 (${phoneParts[1]}) ${phoneParts[2]}-${phoneParts[3]}-${phoneParts[4]}`;

    return { name: record.name, phone: phone, email: record.email };
}

function transformRecordToString(record) {
    record = transformPhoneNumber(record);
    let firstPart = `${record.name}, ${record.phone}`;
    if (stringIsValid(record.email)) {
        firstPart += `, ${record.email}`;
    }

    return firstPart;
}

function compareRecords(first, second) {
    let value = 0;
    if (first.name < second.name) {
        value = -1;
    } else if (first.name > second.name) {
        value = 1;
    }

    return value;
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
    if (!stringIsValid(csv)) {
        return 0;
    }
    let values = csv.split('\n').map(string => string.split(';'));
    let counter = 0;
    for (let [name, phone, email] of values) {
        if (this.add(phone, name, email) ||
            this.update(phone, name, email)) {
            counter++;
        }
    }

    return counter;
};
