'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

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
    let newSub = { phone: phone, name: name, email: email };
    if (validateSub(newSub) && isSubNotExist(newSub)) {
        phoneBook.push(newSub);

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @param {Boolean} _compFlag
 * @returns {Boolean}
 */
exports.update = function (phone, name, email, _compFlag = false) {
    var subIndex = getSubIndexByPhone(phone);
    if (subIndex === -1 || !validateSub({ phone: phone, name: name, email: email })) {
        return false;
    }
    var sub = phoneBook[subIndex];
    sub.name = name;
    if (email !== undefined || !_compFlag) {
        sub.email = email;
    }

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Integer}
 */
exports.findAndRemove = function (query) {
    var newPhoneBook = phoneBook.slice();
    var removedElementsCount = 0;
    for (var sub of newPhoneBook) {
        if (searchInSubForKeyword(sub, query)) {
            phoneBook.splice(phoneBook.indexOf(sub), 1);
            removedElementsCount++;
        }
    }

    return removedElementsCount;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    var newSubsArray = [];
    if (query === '' || query === undefined) {
        return newSubsArray;
    }
    for (var sub of phoneBook) {
        var subPushed = false;
        if (searchInSubForKeyword(sub, query)) {
            newSubsArray.push(sub.name + ', +7 (' + sub.phone.substring(0, 3) +
            ') ' + sub.phone.substring(3, 6) + '-' + sub.phone.substring(6, 8) +
            '-' + sub.phone.substring(8, 10));
            subPushed = true;
        }
        if (subPushed && sub.email !== undefined) {
            newSubsArray[newSubsArray.length - 1] += ', ' + sub.email;
        }
    }
    newSubsArray = sortPhoneBookByName(newSubsArray);

    return newSubsArray;
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
    csv = convertCsvToArray(csv);
    var csvCopy = csv.slice();
    for (var sub of csv) {
        if (!exports.add(sub.phone, sub.name, sub.email) &&
        !exports.update(sub.phone, sub.name, sub.email, true)) {
            csvCopy.splice(csv.indexOf(sub), 1);
            continue;
        }
    }

    return csvCopy.length;
};

function validateSub(subscriber) {
    if (isNameValid(subscriber.name) && isEmailValid(subscriber.email) &&
    isPhoneValid(subscriber.phone)) {

        return true;
    }
}

function isSubNotExist(subscriber) {
    for (var sub of phoneBook) {
        if (sub.phone === subscriber.phone) {

            return false;
        }
    }

    return true;
}

function isPhoneValid(phone) {
    var regExp = /^\d{10}$/;

    return passRegExp(regExp, phone);
}

function isEmailValid(email) {
    let regExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (email === undefined || email === null || passRegExp(regExp, email)) {
        return true;
    }

    return false;
}

function isNameValid(name) {
    if (name === undefined || name === null || name.length === 0) {
        return false;
    }

    return true;
}

function passRegExp(regExp, string) {
    if (regExp.test(string)) {
        return true;
    }

    return false;
}

function getSubIndexByPhone(phone) {
    for (var sub of phoneBook) {
        if (sub.phone === phone) {
            return phoneBook.indexOf(sub);
        }
    }

    return -1;
}

function sortPhoneBookByName(array) {
    array.sort(function (a, b) {
        var a1 = a.slice(0, a.indexOf(','));
        var b1 = b.slice(0, b.indexOf(','));

        return a1.localeCompare(b1);
    });

    return array;
}

function convertCsvToArray(csv) {
    csv = csv.split('\n');
    for (var sub of csv) {
        var convertedToObjSub = sub.split(';');
        convertedToObjSub = { phone: convertedToObjSub[1], name: convertedToObjSub[0],
            email: convertedToObjSub[2] };
        csv.splice(csv.indexOf(sub), 1, convertedToObjSub);

    }

    return csv;
}

function searchInSubForKeyword(sub, query) {
    for (var key of Object.keys(sub)) {
        if (sub[key] !== undefined && sub[key].indexOf(query) !== -1 || query === '*') {

            return true;
        }
    }

    return false;
}
