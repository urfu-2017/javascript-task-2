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
 * @returns {boolean}
 */

exports.add = function (phone, name, email) {
    let isAdd = false;
    if (isCorrectPhone(phone) && name) {
        let contains = phoneBook.some(function (currentRecord) {
            return currentRecord.phone === phone;
        });
        if (!contains) {
            phoneBook.push(
                {
                    phone,
                    name,
                    email
                }
            );
            isAdd = true;
        }
    }

    return isAdd;
};

function isCorrectPhone(phone) {
    return /^\d{10}$/.test(phone);
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean}
 */
exports.update = function (phone, name, email) {
    let isUpdate = false;
    if (isCorrectPhone(phone)) {
        phoneBook.forEach(function (currentRecord) {
            if (name && currentRecord.phone === phone) {
                currentRecord.name = name;
                currentRecord.email = email;
                isUpdate = true;
            }
        });
    }

    return isUpdate;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    let records = exports.find(query);
    if (records.length > 0) {
        phoneBook = phoneBook.filter(function (record) {
            return records.indexOf(formatPhoneBook(record)) === -1;
        });
    }

    return records.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    if (query === '*') {
        return sortingRecords(phoneBook).map(formatPhoneBook);
    }
    if (!query) {
        return [];
    }
    let records = phoneBook.filter(function (record) {
        if (record.email) {

            return record.phone.indexOf(query) !== -1 ||
            record.name.indexOf(query) !== -1 ||
            record.email.indexOf(query) !== -1;
        }

        return record.phone.indexOf(query) !== -1 ||
        record.name.indexOf(query) !== -1;
    });

    return sortingRecords(records).map(formatPhoneBook);
};

function sortingRecords(telephoneBook) {
    return telephoneBook.sort(function (record1, record2) {
        return record1.name.localeCompare(record2.name);
    });
}

function formatPhoneBook(record) {
    let { phone, name, email } = record;
    if (email) {
        return name + ', ' + getFormatPhone(phone) + ', ' + email;
    }

    return name + ', ' + getFormatPhone(phone);
}

function getFormatPhone(phone) {
    return '+7 (' + phone.slice(0, 3) + ') ' +
    phone.slice(3, 6) + '-' + phone.slice(6, 8) + '-' + phone.slice(8);
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
    if (!csv) {
        return 0;
    }
    let countRecords = 0;
    let contactDetails = csv.split('\n');
    contactDetails.forEach(function (record) {
        let [name, phone, email] = record.split(';');
        if (exports.add(phone, name, email) ||
            exports.update(phone, name, email)) {
            countRecords++;
        }
    });

    return countRecords;
};
