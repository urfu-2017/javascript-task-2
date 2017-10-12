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
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    if (!isValidData(phone, name) || searchByPhone(phone)) {
        return false;
    }
    phoneBook.push({
        phone: phone,
        name: name,
        email: email
    });

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
    if (!isValidData(phone, name)) {
        return false;
    }
    var document = searchByPhone(phone);
    if (!document) {
        return false;
    }
    document.name = name;
    document.email = email;

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    var documents = filterBySubstring(query);
    phoneBook = phoneBook.filter(x => documents.indexOf(x) === -1);

    return documents.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */
exports.find = function (query) {
    return filterBySubstring(query)
        .sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }

            return 0;
        })
        .map(formatRecord);
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let records = csv.split('\n');
    let count = 0;
    records.forEach(r => {
        let [name, phone, email] = r.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            count++;
        }
    });

    return count;
};

function isValidData(phone, name) {
    return phone && phone.match(/^\d{10}$/) && name;
}

function searchByPhone(phone) {
    return phoneBook.find(x => x.phone === phone);
}

function filterBySubstring(substring) {
    if (!substring) {
        return [];
    }
    if (substring === '*') {
        return phoneBook;
    }

    return phoneBook.filter(x => x.phone.indexOf(substring) !== -1 ||
     x.name.indexOf(substring) !== -1 || (x.email && x.email.indexOf(substring) !== -1));
}

function formatRecord(record) {
    var phone = record.phone;
    var formatedPhone =
    `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8)}`;
    var formatedEmail = record.email ? `, ${record.email}` : '';

    return `${record.name}, ${formatedPhone}${formatedEmail}`;
}
