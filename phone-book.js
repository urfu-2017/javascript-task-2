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
 * @returns {boolean} success of operation
 */
exports.add = function (phone, name, email) {
    if (!(phone in phoneBook) && /^\d{10}$/.test(phone) && name) {
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
 * @returns {boolean} success of operation
 */
exports.update = function (phone, name, email) {
    if (phone in phoneBook && name) {
        phoneBook[phone] = { name, email };

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Int} count of deleted contacts
 */
exports.findAndRemove = function (query) {
    let numbersForDelete = findContactsByString(query);
    for (let i = 0; i < numbersForDelete.length; i++) {
        delete phoneBook[numbersForDelete[i]];
    }

    return numbersForDelete.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {string[]} Array of strings
 */
exports.find = function (query) {
    let result = [];
    let numbersForDelete = findContactsByString(query);
    for (let i = 0; i < numbersForDelete.length; i++) {
        let number = numbersForDelete[i];
        let miniResult = [];
        miniResult.push(phoneBook[number].name);
        // eslint-disable-next-line max-len
        miniResult.push(`+7 (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 8)}-${number.slice(8, 10)}`);
        if (phoneBook[number].email) {
            miniResult.push(phoneBook[number].email);
        }
        result.push(miniResult.join(', '));
    }
    result.sort();

    return result;
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let rows = csv.split('\n');
    let counter = 0;
    for (let i = 0; i < rows.length; i++) {
        let [name, phone, email] = rows[i].split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            counter++;
        }
    }

    return counter;
};

function findContactsByString(query) {
    if (!query) {
        return [];
    }
    let result = [];
    let regex = new RegExp(query.replace('*', '.*'));
    let numbers = Object.keys(phoneBook);
    for (let phone of numbers) {
        let contact = phoneBook[phone];
        if (regex.test(phone) || regex.test(contact.name) || regex.test(contact.email)) {
            result.push(phone);
        }
    }

    return result;
}
