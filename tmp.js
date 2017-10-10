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
const PHONE_RE = /^(([1-9])\2\2)((\d)\4\4)((\d)\6)((\d)\8)$/;
const NAME_RE = /^[A-ZА-Я][a-zа-я]+$/;
const EMAIL_RE = /[\w_\-.]+@[\w_\-.]+\.[\w_\-.]+/;


function makeEntry(phone, name, email) {
    if (!PHONE_RE.test(phone) || !NAME_RE.test(name) ||
        (email !== undefined && !EMAIL_RE.test(email))) {
        return false;
    }

    return {name, email}
}


function addOrUpdate(phone, name, email) {
    const entry = makeEntry(phone, name, email);
    if (entry === false) {
        return false;
    }
    phoneBook.set(phone, entry);

    return true;
}


/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.add = function (phone, name, email) {
    if (phoneBook.has(phone)) {
        return false;
    }

    return addOrUpdate(phone, name, email);
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.update = function (phone, name, email) {
    if (!phoneBook.has(phone)) {
        return false;
    }

    return addOrUpdate(phone, name, email);
};


function* findMatching(query) {
    query = String(query);
    if (query === '') {
        return;
    }
    if (query === '*') {
        yield* phoneBook.keys();
    }
    for (const [key, {name, email}] of phoneBook) {
        if ([key, name, email].some(
            (elem, num, arr) => String(elem).includes(query))) {
            yield key;
        }
    }
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
exports.findAndRemove = function (query) {
    return Array.from(findMatching(query))
        .map(
            key => phoneBook.delete(key))
        .filter(x => x)
        .length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function (query) {
    const entries = Array.from(findMatching(query), phone => {
        const {name, email} = phoneBook.get(phone);
        return {phone, name, email};
    });
    let res = [];
    for (const entry of entries) {
        let phoneComponents, pComps = PHONE_RE.exec(entry.phone)
            .slice(1, 9)
            .filter((elem, ind, arr) => ind % 2 == 0);
        const formattedPhone = `+7 (${pComps[0]}) ${pComps[1]}-${pComps[2]}-${pComps[3]}`;
        let str = `${entry.name}, ${formattedPhone}`;
        if (entry.email !== undefined) {
            str += `, ${entry.email}`;
        }
        res.push(str);
    }
    res.sort();

    return res;
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
    return csv.split('\n')
        .map(l => l.split(';'))
        .map(l => addOrUpdate(l[1], l[0], l[2]))
        .filter(x => x)
        .length;
};
