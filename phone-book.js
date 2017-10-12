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
var reg = /^(\d{3})(\d{3})(\d{2})(\d{2})$/;

/**
 * Проверка на правильность формы номера
 * @param {String} phone 
 * @returns {bool}
 */
function isPhoneCorrect(phone) {
    let phoneNote = reg.exec(phone);
    if (phoneNote === null) {
        return false;
    }

    return true;
}

/**
 * Приведение телефона к формату +7 (555) 666-77-88
 * @param {String} phone 
 * @returns {String}
 */
function correctPhone(phone) {
    let phNote = reg.exec(phone);
    if (isPhoneCorrect) {
        return '+7 (' + phNote[1] + ') ' + phNote[2] + '-' + phNote[3] + '-' + phNote[4];
    }
}

/**
 * Проверка на правильность формы записи
 * @param {String} phone 
 * @param {String} name 
 * @returns {bool}
 */
function isNoteValid(phone, name) {
    if (!name || typeof(name) !== 'string') {
        return false;
    }
    if (!isPhoneCorrect(phone) || typeof(phone) !== 'string' || !phone) {
        return false;
    }

    return true;
}

/**
 * Присутсвует ли запись в книге
 * @param {String} phone 
 * @returns {bool}
 */
function isNoteExist(phone) {
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            return true;
        }
    }

    return false;
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {bool}
 */
exports.add = function (phone, name, email) {
    if (!isNoteValid(phone, name)) {
        return false;
    }
    if (isNoteExist(phone)) {
        return false;
    }
    let newNote = {
        name: name,
        phone: phone,
        email: ''
    };
    if (email) {
        newNote.email = email;
    }
    phoneBook.push(newNote);

    return true;
};

/**
 * Поиск номера записи по запросу
 * @param {String} query 
 * @returns {Object}
 */
function findExistIndex(query) {
    if (!query) {
        return [];
    }
    let indexs = [];
    for (let i = 0; i < phoneBook.length; i++) {
        let isPhoneEqual = phoneBook[i].phone.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        let isNameEqual = phoneBook[i].name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        let isEmailEqual = phoneBook[i].email.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        if (isEmailEqual || isNameEqual || isPhoneEqual) {
            indexs.push(i);
        }
    }

    return indexs;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {bool}
 */
exports.update = function (phone, name, email) {
    if (!isNoteValid(phone, name)) {

        return false;
    }
    let index = findExistIndex(phone);
    if (index.length !== 1) {

        return false;
    }
    phoneBook[index[0]].name = name;
    phoneBook[index[0]].email = (!email) ? '' : email;

    return true;
};

/** Удаление записей по индексам + undefined
 * @param {Object} indexs
 */
function removeNotes(indexs) {
    for (let i = 0; i < indexs.length; i++) {
        delete phoneBook[indexs[i]];
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i] === undefined) {
            phoneBook.splice(i, 1);
            i--;
        }
    }
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    if (!query || typeof(query) !== 'string') {
        return 0;
    }
    let countRemovedNotes = 0;
    if (query === '*') {
        countRemovedNotes = phoneBook.length;
        phoneBook = [];

        return countRemovedNotes;
    }
    let indexsForRemove = findExistIndex(query);
    countRemovedNotes = indexsForRemove.length;
    removeNotes(indexsForRemove);

    return countRemovedNotes;
};

/** Переводит книгу из объекта в строку, меняя формат телефона
 * @param {Object} book
 * @returns {String}
 */
function changeBook(book) {
    let notesFinal = [];
    for (let i = 0; i < book.length; i++) {
        let note = book[i].name + ', ' + correctPhone(book[i].phone);
        if (book[i].email !== '') {
            note += ', ' + book[i].email;
        }
        notesFinal.push(note);
    }

    return notesFinal;
}

/** Порядок для сортировки по имени
 * @param {Object} note1
 * @param {Object} note2
 * @returns {bool}
 */
function sortBook(note1, note2) {
    return note1.name > note2.name;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String}
 */
exports.find = function (query) {
    if (!query || typeof(query) !== 'string') {
        return [];
    }
    if (query === '*') {
        return changeBook(phoneBook.sort(sortBook));
    }
    let indexs = findExistIndex(query);
    if (indexs.length === 0) {
        return [];
    }
    let finalBook = [];
    for (let i = 0; i < indexs.length; i++) {
        finalBook.push(phoneBook[indexs[i]]);
    }

    return changeBook(finalBook.sort(sortBook));

};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let lines = csv.split('\n');
    let countNotes = 0;
    for (let i = 0; i < lines.length; i++) {
        let oneString = lines[i].split(';');
        if (oneString.length !== 2 && oneString.length !== 3) {
            continue;
        }
        let isNoteWritten = exports.add(oneString[1], oneString[0], oneString[2]);
        if (isNoteWritten) {
            countNotes++;
            continue;
        }
        let isNoteUpdated = exports.update(oneString[1], oneString[0], oneString[2]);
        if (isNoteUpdated) {
            countNotes++;
        }
    }

    return countNotes;
};
