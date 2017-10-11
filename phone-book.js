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
    if (!bookContainsRecord(record) || !recordIsValid(record)) {
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

    return transformPhoneNumber(extractedValues).sort(compareRecords)
        .map(transformRecordToString);
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
    return phoneBook.filter(x => x.phone === record.phone).length !== 0;
}

function extractRecordByPhone(phone) {
    let values = phoneBook.filter(x => x.phone === phone);
    if (values.length !== 1) {
        throw new RangeError('Record is not in the phonebook');
    }

    return values[0];
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

function transformPhoneNumber(values) {
    let result = [];
    let reg = /(\d{3})(\d{3})(\d\d)(\d\d)/;
    for (let record of values) {
        let phoneParts = reg.exec(record.phone);
        if (phoneParts === null) {
            throw new RangeError('Wrong phone format');
        }
        let phone = `+7 (${phoneParts[1]}) ${phoneParts[2]}-${phoneParts[3]}-${phoneParts[4]}`;
        result.push({ name: record.name, phone: phone, email: record.email });
    }

    return result;
}

function transformRecordToString(record) {
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
    let reg = /^(.+);(\d{10});?(.+?)?$/;
    let values = csv.split('\n');
    let counter = 0;
    for (let value of values) {
        let match = reg.exec(value);
        if (match === null) {
            continue;
        }
        let record = { name: match[1], phone: match[2], email: match[3] };
        if (this.add(record.phone, record.name, record.email) ||
            this.update(record.phone, record.name, record.email)) {
            counter++;
        }
    }

    return counter;
};
