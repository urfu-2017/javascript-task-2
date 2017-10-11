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
const PHONE_RE = /^\d{10}$/;
const PHONE_COMPS_RE = /^(\d{3})(\d{3})(\d{2})(\d{2})$/;


function makeEntry(phone, name, email) {
    if (typeof phone !== 'string' || typeof name !== 'string' ||
        !PHONE_RE.test(phone) || name === '') {
        return false;
    }

    return { phone, name,
        email: typeof email === 'string' ? email : undefined };
}


function getEntryStringRepr(entry) {
    let comps = PHONE_COMPS_RE.exec(entry.phone)
        .slice(1, 5);
    const formattedPhone = `+7 (${comps[0]}) ${comps[1]}-${comps[2]}-${comps[3]}`;

    return [entry.name, formattedPhone, entry.email].filter(x => x)
        .join(', ');
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
 * @returns {Boolean}
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
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    if (!phoneBook.has(phone)) {
        return false;
    }

    return addOrUpdate(phone, name, email);
};


function findMatching(query) {
    query = typeof query === 'string' ? query : '';
    let entries;
    if (query === '*') {
        entries = [...phoneBook.values()];
    } else if (query !== '') {
        entries = [...phoneBook.values()]
            .filter(e => Object.values(e).some(
                x => String(x).includes(query)
            ));
    } else {
        entries = [];
    }

    return entries;
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    return Array.from(findMatching(query))
        .map(
            entry => phoneBook.delete(entry.phone))
        .filter(x => x)
        .length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    return [...findMatching(query)]
        .map(e => getEntryStringRepr(e))
        .sort();
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
        .map(line => line.split(';'))
        .map(l => addOrUpdate(l[1], l[0], l[2]))
        .filter(x => x)
        .length;
};
