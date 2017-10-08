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

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */

exports.add = function (phone, name, email) {
    let isCorrectNode = (p, n) => (/^\d{10}$/.test(p) && (typeof n) === 'string' && n.length > 0);
    if (isCorrectNode(phone, name) && !phoneBook.hasOwnProperty(phone)) {
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
    if (phoneBook.hasOwnProperty(phone) && ((typeof name) === 'string')) {
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
    if (query === undefined) {
        return notes;
    }

    let addAllNotes = query === '*';

    let isSuitableNote = (note) => {
        let phone = note[0];
        let name = note[1].name;
        let email = note[1].email || '';

        return phone.match(query) || name.match(query) || email.match(query);
    };
    for (let note of Object.entries(phoneBook)) {
        if (addAllNotes || isSuitableNote(note)) {
            notes.push([note[1].name, note[0], note[1].email || '']);
        }
    }

    return notes;
}

function formatNotes(notes) {
    let sort = (note1, note2) => {
        if (note1[0] > note2[0]) {
            return 1;
        }

        return note1[0] === note2[0] ? 0 : -1;
    };

    let map = (note) => {
        return note[0] + ', ' + formatPhone(note[1]) + ((note[2] === '') ? '' : (', ' + note[2]));
    };

    return notes.sort(sort).map(map);
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
