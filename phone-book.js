'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
const phoneBook = new Map();

const PHONE_PATTERN = /^(\d{3})(\d{3})(\d{2})(\d{2})$/;

function formatPhone(phone) {
    return phone.replace(PHONE_PATTERN, (match, ...groups) => {
        return `+7 (${groups[0]}) ${groups[1]}-${groups[2]}-${groups[3]}`;
    });
}

function search(query) {
    const records = query ? Array.from(phoneBook.entries()) : [];

    if (query === '*') {
        return records;
    }

    return records.filter(
        ([phone, { name, email }]) =>
            phone.includes(query) || name.includes(query) || email.includes(query)
    );
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email = '') {
    if (!name || !PHONE_PATTERN.test(phone) || phoneBook.has(phone)) {
        return false;
    }

    phoneBook.set(phone, { name, email });

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email = '') {
    if (!name || !phoneBook.has(phone)) {
        return false;
    }

    phoneBook.set(phone, { name, email });

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    const findRecords = search(query);

    for (let [phone] of findRecords) {
        phoneBook.delete(phone);
    }

    return findRecords.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */
exports.find = function (query) {
    return search(query).sort(([, a], [, b]) => a.name.localeCompare(b.name))
        .map(([phone, { name, email }]) => {
            return `${name}, ${formatPhone(phone)}${email ? `, ${email}` : ''}`;
        });
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    return csv.split('\n').filter(line => {
        const [name, phone, email] = line.split(';');

        return exports.add(phone, name, email) || exports.update(phone, name, email);
    }).length;
};
