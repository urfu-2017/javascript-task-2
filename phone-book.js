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

function validData(phone, name) {
    const intPhone = Number(phone);
    if (isNaN(intPhone) || phone.length !== 10 || name === undefined) {
        return false;
    }

    return true;
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    email = email || '';

    if (!validData(phone, name)) {
        return false;
    }

    for (const { phone: ph } of phoneBook) {
        if (phone === ph) {
            return false;
        }
    }

    phoneBook.push({
        phone,
        name,
        email
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
    email = email || '';
    if (!validData(phone, name)) {
        return false;
    }

    for (var index in phoneBook) {
        if (phoneBook[index].phone === phone) {
            phoneBook[index].name = name;
            phoneBook[index].email = email;

            return true;
        }
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Integer}
 */
exports.findAndRemove = function (query) {
    let indexes = getIndexesOfFinded(query);
    indexes.reverse();
    for (const idx of indexes) {
        phoneBook.splice(idx, 1);
    }

    return indexes.length;
};

function beautifulPhone(phone) {
    return `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8)}`;
}

function existsSubstr(phone, name, email, query) {
    if (phone.search(query) !== -1 || name.search(query) !== -1 || email.search(query) !== -1) {
        return true;
    }

    return false;
}

function getIndexesOfFinded(query) {
    query = query || '';

    switch (query) {
        case '':
            return [];
        case '*':
            query = '';
            break;
        default:
            break;
    }

    let result = [];

    for (let index = 0; index < phoneBook.length; index++) {
        let { phone, name, email } = phoneBook[index];
        if (existsSubstr(phone, name, email, query)) {
            result.push(index);
        }
    }

    return result;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    const indexes = getIndexesOfFinded(query);
    let result = [];

    for (const idx of indexes) {
        const { phone, name, email } = phoneBook[idx];
        let arr = [name, beautifulPhone(phone)];
        if (email !== '') {
            arr.push(email);
        }
        result.push(arr.join(', '));
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
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует
    let rows = csv.split('\n');
    let counter = 0;
    for (const row of rows) {
        const [name, phone, email] = row.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            counter++;
        }
    }

    return counter;
};
