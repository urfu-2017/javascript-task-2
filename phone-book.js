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

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} result
 */
exports.add = function (phone, name, email) {
    let added = false;
    if (isNameCorrect(phone, name) && !(phone in phoneBook)) {
        phoneBook[phone] = { name: name, email: email };
        added = true;
    }

    return added;
};

function isNameCorrect(phone, name) {
    let regExp = /[0-9]{10}/;

    return (name !== '' && name !== null && name !== undefined &&
    phone.length === 10 && regExp.test(phone));
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} result
 */
exports.update = function (phone, name, email) {
    let updated = false;
    if (phone in phoneBook && isNameCorrect(phone, name)) {
        phoneBook[phone] = { name: name, email: email };
        updated = true;
    }

    return updated;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Boolean}
 */
exports.findAndRemove = function (query) {
    let countDeleted;
    if (query === '') {
        countDeleted = 0;
    } else if (query === '*') {
        countDeleted = Object.keys(phoneBook).length;
        for (let phone of Object.keys(phoneBook)) {
            delete phoneBook[phone];
        }
    } else {
        let linesToDelete = searchLines(query);
        countDeleted = Object.keys(linesToDelete).length;
        for (let phone of Object.keys(linesToDelete)) {
            delete phoneBook[phone];
        }
    }

    return countDeleted;
};


/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Boolean} result
 */
exports.find = function (query) {
    let results = [];
    if (query === '') {
        results = [];
    } else if (query === '*') {
        results = makeResultList(phoneBook);
    } else {
        let resultOfSearch = searchLines(query);
        results = makeResultList(resultOfSearch);
    }

    return results;
};


function makeResultList(inputObject) {
    let finalResults = [];
    for (let phone of Object.keys(inputObject)) {
        let finalCurrentString = '';
        finalCurrentString += inputObject[phone].name + ', ';
        finalCurrentString += createPhoneView(phone);
        if (inputObject[phone].email !== undefined && inputObject[phone].email !== null &&
            inputObject[phone].email !== '') {
            finalCurrentString += ', ' + inputObject[phone].email;
        }
        finalResults.push(finalCurrentString);
    }
    finalResults = finalResults.sort();

    return finalResults;
}

function createPhoneView(phone) {
    let updatedPhone = phone;
    let regExp = /(\d{3})(\d{3})(\d{2})(\d{2})/;

    return updatedPhone.replace(regExp, '+7 ($1) $2-$3-$4');
}

function searchLines(query) {
    let results = {};
    let phones = Object.keys(phoneBook);
    for (let phone of phones) {
        if (phone.indexOf(query) !== -1 || phoneBook[phone].name.indexOf(query) !== -1 ||
        (phoneBook[phone].email !== undefined && phoneBook[phone].email.indexOf(query) !== -1)) {
            results[phone] = phoneBook[phone];
        }
    }

    return results;
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
    let lines = csv.split('\n');
    let count = 0;
    for (let line of lines) {
        let lineElements = line.split(';');
        let result = this.add(lineElements[1], lineElements[0], lineElements[2]);
        if (!result) {
            result = this.update(lineElements[1], lineElements[0], lineElements[2]);
        }
        if (result) {
            count += 1;
        }
    }

    return count;
};
