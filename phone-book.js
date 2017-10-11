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
    if (!isValidPhoneNumber(phone) ||
    !isCorrectName(name) ||
    phoneBook.some(x => x.phone === phone)) {
        return false;
    }
    let phoneBookEntry = { phone, name, email };
    phoneBookEntry.email = (typeof email !== 'string') ? '' : email;
    phoneBook.push(phoneBookEntry);

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
    if (!isValidPhoneNumber(phone) || !isCorrectName(name) || !isExistingPhoneNumber(phone)) {
        return false;
    }
    let phoneBookEntry = getPhoneBookEntry(phone);
    phoneBookEntry.email = (typeof email !== 'string') ? '' : email;
    phoneBookEntry.name = name;

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Object}
 */
exports.findAndRemove = function (query) {
    let deletedEntriesCount = phoneBook.length;
    if (query === '' || typeof query !== 'string') {
        return 0;
    }
    if (query === '*') {
        phoneBook = [];

        return deletedEntriesCount;
    }
    phoneBook = phoneBook.filter(x => !isContainsPattern(x, query));
    deletedEntriesCount -= phoneBook.length;

    return deletedEntriesCount;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Object}
 */
exports.find = function (query) {
    if (query === '' || typeof query !== 'string') {
        return [];
    }
    if (query === '*') {
        phoneBook.sort(compareName);

        return getQueryResult(phoneBook);
    }
    let result = phoneBook.filter(x => isContainsPattern(x, query)).sort(compareName);

    return getQueryResult(result);
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let entriesCount = 0;
    if (typeof csv !== 'string') {
        return entriesCount;
    }
    let csvEntries = csv.split('\n');

    for (let csvEntry of csvEntries) {
        let [name, phone, email] = csvEntry.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            entriesCount++;
        }
    }

    return entriesCount;
};

/**
 * 
 * @param {String} phoneNumber 
 * @returns {Boolean}
 */
function isValidPhoneNumber(phoneNumber) {
    if (typeof phoneNumber !== 'string') {
        return false;
    }

    return /^\d{10}$/.test(phoneNumber);
}

/**
 * 
 * @param {String} phoneNumber 
 * @returns {Boolean}
 */
function isExistingPhoneNumber(phoneNumber) {
    for (let phoneBookEntry of phoneBook) {
        if (phoneBookEntry.phone === phoneNumber) {
            return true;
        }
    }

    return false;
}

/**
 * 
 * @param {String} name 
 * @returns {Boolean}
 */
function isCorrectName(name) {
    return /.+/.test(name) && name !== undefined && typeof name === 'string';
}

/**
 * 
 * @param {String} phone 
 * @returns {Object}
 */
function getPhoneBookEntry(phone) {
    for (let phoneBookEntry of phoneBook) {
        if (phoneBookEntry.phone === phone) {
            return phoneBookEntry;
        }
    }
}

/**
 * 
 * @param {Array} phoneBookEntries 
 * @returns {Array}
 */
function getQueryResult(phoneBookEntries) {
    let result = [];
    for (let i = 0; i < phoneBookEntries.length; i++) {
        let phoneBookEntry = phoneBookEntries[i];
        result.push(phoneBookEntryToString(phoneBookEntry));
    }

    return result;
}

function phoneBookEntryToString(phoneBookEntry) {
    var phone = phoneBookEntry.phone;
    var a = phone.substring(0, 3);
    var b = phone.substring(3, 6);
    var c = phone.substring(6, 8);
    var d = phone.substring(8);
    var phoneNumber = `+7 (${a}) ${b}-${c}-${d}`;

    if (typeof phoneBookEntry.email !== 'string' || phoneBookEntry.email === '') {
        return `${phoneBookEntry.name}, ${phoneNumber}`;
    }

    return `${phoneBookEntry.name}, ${phoneNumber}, ${phoneBookEntry.email}`;
}

function isContainsPattern(phoneBookEntry, pattern) {
    if (phoneBookEntry.phone.indexOf(pattern) !== -1) {
        return true;
    }
    if (phoneBookEntry.email.indexOf(pattern) !== -1) {
        return true;
    }
    if (phoneBookEntry.name.indexOf(pattern) !== -1) {
        return true;
    }

    return false;
}

function compareName(firstPhoneBookEntry, secondfirstPhoneBookEntry) {
    if (firstPhoneBookEntry.name < secondfirstPhoneBookEntry.name) {
        return -1;
    }
    if (firstPhoneBookEntry.name > secondfirstPhoneBookEntry.name) {
        return 1;
    }
    if (firstPhoneBookEntry.name === secondfirstPhoneBookEntry.name) {
        return 0;
    }
}
