'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

/**
 * Телефонная книга
 */
var phoneBook = {};
function checkPhone(phone) {
    if (typeof(phone) === 'string' && phone.match(/\d/g).length === 10) {
        return true;
    }

    return false;
}
function checkName(name) {
    if (typeof(name) === 'string') {
        return true;
    }

    return false;
}
function checkMail(mail) {
    if (typeof(mail) === 'string' || mail === undefined) {
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
function reversePhone(normalizedPhone) {
    var phone = '';
    var actualPhone = normalizedPhone.split('+7 ')[1];
    var symbol = '';
    for (var i = 0; i < actualPhone.length; i++) {
        symbol = actualPhone[i];
        if (symbol !== '(' && symbol !== ')' && symbol !== '-' && symbol !== ' ') {
            phone += symbol;
        }
    }

    return phone;
}
function getNotesStruct(foundNames, foundNotes, result) {
    var anotherName;
    var anotherPhone;
    var anotherMail;
    for (var i = 0; i < foundNames.length; i++) {
        anotherName = foundNames[i];
        anotherPhone = normalizePhone(foundNotes[anotherName][0]);
        anotherMail = foundNotes[anotherName][1];
        if (anotherMail === undefined) {
            result.push(anotherName + ', ' + anotherPhone);
        } else {
            result.push(anotherName + ', ' + anotherPhone + ', ' + anotherMail);
        }
    }

    return result;
}

function checking(query, number, name, email) {
    if (query === '*' || number.includes(query)) {

        return true;
    } else if (name.includes(query)) {

        return true;
    } else if (email !== undefined && email.includes(query)) {

        return true;
    }

    return false;
}
function getNotes(query) {
    var allNumbers = Object.keys(phoneBook);
    var foundNames = [];
    var foundNotes = {};
    var foundName = '';
    for (var i = 0; i < allNumbers.length; i++) {
        foundName = phoneBook[allNumbers[i]][0];
        if (checking(query, allNumbers[i], foundName, phoneBook[allNumbers[i]][1])) {
            foundNames.push(foundName);
            foundNotes[foundName] = [allNumbers[i], phoneBook[allNumbers[i]][1]];
        }
    }
    foundNames.sort();
    var result = getNotesStruct(foundNames, foundNotes, []);

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
    if (checkPhone(phone) && checkName(name) && checkMail(email)) {
        if (!Object.keys(phoneBook).includes(phone)) {
            phoneBook[phone] = [name, email];

            return true;
        }

        return false;
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
    if (checkPhone(phone) && checkName(name) && checkMail(email)) {
        if (phoneBook[phone] !== undefined) {
            phoneBook[phone] = [name, email];

            return true;
        }

        return false;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {number} notes
 */
exports.findAndRemove = function (query) {
    if (typeof(query) !== 'string') {
        return 0;
    } else if (query !== '') {
        var foundNotes = getNotes(query);
        for (var i = 0; i < foundNotes.length; i++) {
            delete phoneBook[reversePhone(foundNotes[i].split(', ')[1])];
        }
    } else {
        return 0;
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
        if(query === '') {
            return [];
        }
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
