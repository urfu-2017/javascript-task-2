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
function checkPhone(phone) {
    if (phone.match(/\d/g).length === 10) {
        return true;
    }

    return false;
}
function checkName(name) {
    if (typeof(name) === 'string' && name !== '') {
        return true;
    }

    return false;
}
function normalizePhone(phone) {
    var firstPart = phone[0] + phone[1] + phone[2];
    var secondPart = phone[3] + phone[4] + phone[5] + '-' + phone[6];
    secondPart = secondPart + phone[7] + '-' + phone[8] + phone[9];
    var result = '+7 (';
    result += firstPart;
    result += ') ';
    result += secondPart;
    return result;
}
function getNotesStruct(foundNames, foundNotes, result) {
    var anotherName;
    var anotherPhone;
    var anotherMail;
    for (var i = 0; i < foundNames.length(); i++) {
        anotherName = foundNames[i];
        anotherPhone = normalizePhone(foundNotes[anotherName][0]);
        anotherMail = foundNotes[anotherName][1];
        result.push([anotherName + ', ' + anotherPhone + ', ' + anotherMail]);
    }

    return result;
}
function getNotes(query) {
    var allNumbers = Object.keys(phoneBook);
    var foundNames = [];
    var foundNotes = {};
    var foundName = '';
    for (var i = 0; i < allNumbers.length; i++) {
        foundName = phoneBook[allNumbers[i]][0];
        if (foundName.includes(query) || phoneBook[allNumbers[i]][1].includes(query)) {
            foundNames.push(foundName);
            foundNotes[foundName] = [allNumbers[i], phoneBook[allNumbers[i]][1]];
        } else if (query === '*' || allNumbers[i].includes(query)) {
            foundNames.push(foundName);
            foundNotes[foundName] = [allNumbers[i], phoneBook[allNumbers[i]][1]];
        }
    }
    foundNames.sort();
    result = getNotesStruct(foundNames, foundNotes, []);

    return result;
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean} operation result
 */
exports.add = function (phone, name, email) {
    if (checkPhone(phone) && checkName(name)) {
        if (!Object.keys(phoneBook).includes(phone)) {
            phoneBook[phone] = [name, email];
        }

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean} operation result
 */
exports.update = function (phone, name, email) {
    if (checkPhone(phone) && checkName(name)) {
        if (phoneBook[phone] !== undefined) {
            phoneBook[phone] = [name, email];

            return true;
        }
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {number} notes
 */
exports.findAndRemove = function (query) {
    var foundNotes = getNotes(query);
    for (var i = 0; i < foundNotes.length; i++) {
        delete phoneBook[foundNotes[i][1]];
    }

    return foundNotes.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array} result
 */
exports.find = function (query) {
    if (typeof(query) === 'string') {
        return getNotes(query);
    }

    return [];
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

    return csv.split('\n').length;
};
