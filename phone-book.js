'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;
exports.update = update;
exports.add = add;

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
function add(phone, name, email) {
    if (name === null || name === undefined || name.length === 0) {
        return false;
    }
    if (!/^\d{10}$/.test(phone)) {
        return false;
    }
    if (phoneBook.some(record => record.phone === phone)) {
        return false;
    }
    phoneBook.push({ phone, name, email });

    return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
function update(phone, name, email) {
    if (name === null || name === undefined || name.length === 0) {
        return false;
    }
    if (phoneBook.some((record, index) => {
        if (record.phone === phone) {
            phoneBook[index].name = name;
            phoneBook[index].email = email;

            return true;
        }

        return false;
    })) {
        return true;
    }

    return false;
}


/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    let records = filterByQuery(query);
    for (let key of records.keys()) {
        phoneBook.splice(key, 1);
    }

    return records.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    const records = filterByQuery(query);
    records.sort((a, b) => a.name.localeCompare(b.name));
    records.forEach(value => {
        const tempResult = [value.name, formatPhone(value.phone)];
        if (value.email !== undefined) {
            tempResult.push(value.email);
        }
        value.result = tempResult.join(', ');
    });
    let results = records.map(record => record.result);

    return results;
};

/**
 * 
 * @param {String} query 
 * @returns {Array}
 */
function filterByQuery(query) {
    if (query === '*') {
        return phoneBook.slice(0);
    }

    return phoneBook.filter((item) => {
        if (item.name.search(query) >= 0 ||
            item.phone.search(query) >= 0 ||
            item.email !== undefined && item.email.search(query) >= 0) {
            return true;
        }

        return false;
    });
}

/**
 * 
 * @param {String} phone 
 * @returns {String}
 */
function formatPhone(phone) {
    return '+7 (' + phone.substring(0, 3) + ') ' +
        phone.substring(3, 6) + '-' +
        phone.substring(6, 8) + '-' +
        phone.substring(8);
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
    const records = csv.split('\n');
    let count = 0;
    for (const record of records) {
        const [name, phone, email] = record.split(';');
        count += update(phone, name, email) || add(phone, name, email) ? 1 : 0;
    }

    return count;
};
