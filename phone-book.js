'use strict';

const TEL_PATTERN = /^\d{10}$/;

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
    if (isValidInput(phone, name) && !phoneBook.some(record => record.phone === phone)) {
        phoneBook.push({ phone, name, email });

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    if (!name) {
        return false;
    }

    for (const record of phoneBook) {
        if (record.phone === phone) {
            record.name = name;
            record.email = email;

            return true;
        }
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} number of removed records
 */
exports.findAndRemove = function (query) {
    const sourcePhonebookLength = phoneBook.length;
    phoneBook = phoneBook
        .filter(record => !Object.values(record)
            .some(value => value && value.includes(query))
        );

    return sourcePhonebookLength - phoneBook.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array} found records sorted by phone
 */
exports.find = function (query) {
    query = normalizeQuery(query);

    return phoneBook
        .filter(record => Object.values(record)
            .some(value => value && value.includes(query))
        )
        .map(record => {
            const { phone, name, email } = record;

            let result = `${name}, ${formatPhone(phone)}`;
            if (email) {
                result = `${result}, ${email}`;
            }

            return result;
        })
        .sort();
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    return csv.split('\n')
        .reduce((acc, csvRecord) => {
            const [name, phone, email] = csvRecord.split(';');

            return acc + (exports.add(phone, name, email) || exports.update(phone, name, email));
        }, 0);
};

function isValidInput(phone, name) {
    return TEL_PATTERN.test(phone) && name;
}

function normalizeQuery(query) {
    if (query === '*') {
        return '';
    }

    if (query === '') {
        return '\0';
    }

    return query;
}

function formatPhone(phone) {
    const phoneRegex = /(\d{3})(\d{3})(\d{2})(\d{2})/;

    return phone.replace(phoneRegex, '+7 ($1) $2-$3-$4');
}
