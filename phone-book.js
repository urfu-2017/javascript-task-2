'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = new Map();

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} true если запись успешно добавлена, иначе false
 */
exports.add = function (phone, name, email) {
    if (validatePhone(phone) && validateName(name)) {
        if (phoneBook.has(phone)) {
            return false;
        }
        phoneBook.set(phone, { 'name': name, 'email': email });

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} true если запись успешно обновлена, иначе false
 */
exports.update = function (phone, name, email) {
    if (validatePhone(phone) && validateName(name)) {
        if (!phoneBook.has(phone)) {
            return false;
        }

        phoneBook.set(phone, { 'name': name, 'email': email });

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} число удалённых записей
 */
exports.findAndRemove = function (query) {
    if (typeof query !== 'string' || query === '') {
        return 0;
    }
    if (query === '*') {
        let size = phoneBook.size;
        phoneBook.clear();

        return size;
    }

    let matchedPhones = getMatches(query);
    for (let phone of matchedPhones) {
        phoneBook.delete(phone);
    }

    return matchedPhones.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    if (typeof query !== 'string' || query === '') {
        return [];
    }

    let matchedPhones;
    if (query === '*') {
        matchedPhones = Array.from(phoneBook.keys());
    } else {
        matchedPhones = getMatches(query);
    }

    matchedPhones = matchedPhones.sort(phoneEntryComparer);

    let entries = [];
    for (let phone of matchedPhones) {
        let emailPart = phoneBook.get(phone).email ? `, ${phoneBook.get(phone).email}` : '';
        entries.push(`${phoneBook.get(phone).name}, ${formatPhone(phone)}` + emailPart);
    }

    return entries;
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let stringEntries = csv.split('\n');
    let entriesAddedCount = 0;

    for (let stringEntry of stringEntries) {
        let [name, phone, email] = stringEntry.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            entriesAddedCount++;
        }
    }

    return entriesAddedCount;
};

/**
 * Проверка номера телефона
 * @param {String} phone
 * @returns {Boolean} true если номер телефона записан корректно, иначе false
 */
function validatePhone(phone) {
    return typeof(phone) === 'string' && /^\d{10}$/.test(phone);
}

/**
 * Проверка имени
 * @param {String} name
 * @returns {Boolean} true если имя прошло проверку, иначе false
 */
function validateName(name) {
    return typeof(name) === 'string' && name !== '';
}

/**
 * Получение списка записей телефонной книги удовлетворяющих запросу
 * @param {String} query
 * @returns {Array}
 */
function getMatches(query) {
    let matchedKeys = [];

    phoneBook.forEach((value, key) => {
        let isPhoneMatched = key.indexOf(query) !== -1;
        let isNameMatched = value.name.indexOf(query) !== -1;
        let isEmailMatched = value.email && value.email.indexOf(query) !== -1;

        if (isPhoneMatched || isNameMatched || isEmailMatched) {
            matchedKeys.push(key);
        }
    });

    return matchedKeys;
}

function phoneEntryComparer(first, second) {
    let firstName = phoneBook.get(first).name;
    let secondName = phoneBook.get(second).name;

    if (firstName > secondName) {
        return 1;
    }
    if (firstName < secondName) {
        return -1;
    }

    return 0;
}

/**
 * Приводит телефон к формату +7 (555) 666-77-88 из формата 5556667788
 * @param {String} phone
 * @returns {String} phone
 */
function formatPhone(phone) {
    return `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-` +
        `${phone.slice(6, 8)}-${phone.slice(8, 10)}`;
}
