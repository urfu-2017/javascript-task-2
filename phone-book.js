'use strict';

exports.isStar = false;

var phoneBook = {};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */

function isCorrectNote(phone, name, email) {
    let isPhoneCorrect = typeof phone === 'string' && /^(\d){10}$/.test(phone);
    let isNameCorrect = typeof name === 'string' && name !== '';
    let isEmailCorrect = (typeof email === 'string' && email !== '') || email === undefined;


    return isPhoneCorrect && isNameCorrect && isEmailCorrect;
}

exports.add = function (phone, name, email) {
    if (isCorrectNote(phone, name, email) && !phoneBook.hasOwnProperty(phone)) {
        phoneBook[phone] = { name, email };

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */


exports.update = function (phone, name, email) {
    if (phoneBook.hasOwnProperty(phone) && isCorrectNote(phone, name, email)) {
        phoneBook[phone] = { name, email };

        return true;
    }

    return false;
};

function formatPhone(phone) {
    let parts = phone.match(/^(.{1,3})(.{1,3})(.{1,2})(.{1,2})$/).slice(1, 5);

    return '+7 (' + parts[0] + ') ' + parts[1] + '-' + parts[2] + '-' + parts[3];
}

function suitableNotes(query) {
    let notes = [];
    let emptyQuery = (q) => typeof q !== 'string' || q === '';
    if (emptyQuery(query)) {
        return notes;
    }

    let addAllNotes = query === '*';

    let isSuitableNote = (note, q) => {
        let phone = note[0];
        let name = note[1].name;
        let email = note[1].email || '';

        return phone.indexOf(q) !== -1 || name.indexOf(q) !== -1 || email.indexOf(q) !== -1;
    };
    for (let note of Object.entries(phoneBook)) {
        if (addAllNotes || isSuitableNote(note, query)) {
            notes.push([note[1].name, note[0], note[1].email || '']);
        }
    }

    return notes;
}

function formatNotes(notes) {
    let map = (note) => {
        return note[0] + ', ' + formatPhone(note[1]) + ((note[2] === '') ? '' : (', ' + note[2]));
    };

    return notes.map(map).sort();
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */

exports.find = function (query) {
    return formatNotes(suitableNotes(query));
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Array}
 */

exports.findAndRemove = function (query) {
    let deleteNotes = suitableNotes(query);
    for (let note of deleteNotes) {
        delete phoneBook[note[1]];
    }

    return deleteNotes.length;
};


/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
/*
exports.importFromCsv = function (csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует

    return csv.split('\n').length;
};
*/
