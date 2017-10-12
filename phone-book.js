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
    let note = getNote(phone, name, email);
    if (!note || tryFind(note) !== -1) {
        return false;
    }
    phoneBook.push(note);

    return true;
};

/**
 * Обновление записи в телефонной книгеs
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boleean}
 */
exports.update = function (phone, name, email) {
    let note = getNote(phone, name, email);
    let index = tryFind(note);
    if (!note || index === -1) {
        return false;
    }
    phoneBook[index] = note;

    return true;

};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Int}
 */
exports.findAndRemove = function (query) {
    let founded = fingNotes(query);
    let count = founded.length;
    for (let i = 0; i < count; i++) {
        let index = phoneBook.indexOf(founded[i]);
        let temp = phoneBook.slice(index, i);
        phoneBook = temp;
    }

    return count;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    if (! isValidStr(query) || query.length === 0) {
        return null;
    }
    let founded = fingNotes(query);
    let res = [];
    for (let i = 0; i < founded.length; i++) {
        res[i] = noteToStr(founded[i]);
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

    return csv.split('\n').length;
};

function fingNotes(query) {
    if (query === '*') {
        return phoneBook;
    }
    let foundNotes = [];
    for (let i = 0; i < phoneBook.length; i++) {
        if (isNoteMatch(query, phoneBook[i])) {
            foundNotes.push(phoneBook[i]);
        }
    }

    return foundNotes;
}

function isNoteMatch(query, note) {
    let inPhone = note.phone.indexOf(query) !== -1;
    let inEmail = note.email.indexOf(query) !== -1;
    let inName = note.name.indexOf(query) !== -1;

    return inPhone || inEmail || inName;
}

function noteToStr(note) {
    let rawPhone = note.phone;
    let phone = `+7 (${rawPhone.substr(0, 3)}) ${
        rawPhone.substr(3, 3)}-${rawPhone.substr(6, 2)}-${rawPhone.substr(8, 2)}`;
    // let phone = '+7 (' + subf(note, 0, 3) + ') ' +
    //  subf(note, 3, 3) + '-' + subf(note, 6, 2) + '-' + subf(note, 8, 2);
    if (note.email === '') {
        return `${note.name}, ${phone}`;
    }

    return `${note.name}, ${phone}, ${note.email}`;
}

// function subf(note, start, count) {
//     return note.phone.substr(start, count);
// }

function getNote(phone, name, email) {
    if (! (isValidStr(phone) && isValidNumber(phone) && isValidStr(name) && name.length !== 0)) {
        return null;
    }
    let note = {};
    note.phone = phone;
    note.name = name;
    if (isValidStr(email) && isValidEmail(email)) {
        note.email = email;
    } else {
        note.email = '';
    }

    return note;
}

function tryFind(note) {
    let index = -1;
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === note.phone) {
            index = i;
            break;
        }
    }

    return index;
}

function isValidStr(str) {
    return typeof(str) === 'string';
}

function isValidEmail(email) {
    let re = /([a-z0-9-]+@[a-z0-9]+\.[a-z0-9-]{2,4})/i;
    let result = re.exec(email);
    if (result) {
        return result[0] === email;
    }

    return false;
}

function isValidNumber(str) {
    if (str.length !== 10) {
        return false;
    }
    let re = /\d{10}/;
    if (re.exec(str)) {
        return true;
    }

    return false;
}


// function addCorrect() {
//     exports.add('5554440044', 'Григорий', 'grisha@example.com');
//     exports.add('5552220022', 'Борис', 'boris@example.com');
//     exports.add('5551110011', 'Алекс');
//     exports.add('5553330033', 'Валерий', 'valera@example.com');
// }

// function addIncorrect() {
//     exports.add('3330033', 'Неизвестный', 'unknown@example.com');
//     exports.add('5551110011', 'Алексей');
//     exports.add('5555550055');
// }
// function update() {
//     exports.update('5551110011', 'Алексей', 'alex@example.com');
//     exports.update('5553330033', 'Валерий');
// }
// addCorrect();
// addIncorrect();
// update();
// let a = exports.find('555');
// console.log(a);
