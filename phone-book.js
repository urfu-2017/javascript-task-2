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
 * @returns {Bool}
 */
exports.add = function (phone, name, email) {
    let contact = { phone: phone, name: name, email: email };
    if (isNoteCorrect(phone, name, email) && !isNoteInPhoneBook(phone)) {
        phoneBook.push(contact);

        return true;

    }

    return false;

};

function isNoteCorrect(phone, name, email) {
    let reg = /^(\d){10}$/;

    return typeof phone === 'string' && phone.match(reg) !== null &&
        typeof name === 'string' && name !== '' &&
        ((typeof email === 'string' && email !== '') || email === undefined);
}

function isNoteInPhoneBook(phone) {
    for (let note of phoneBook) {
        if (phone === note.phone) {
            return true;

        }
    }

    return false;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Bool}
 */
exports.update = function (phone, name, email) {
    for (let note of phoneBook) {
        if (phone === note.phone && isNoteCorrect(phone, name, email)) {
            note.name = name;
            note.email = email;

            return true;
        }
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @returns {Bool}
 * @param {String} query
*/
exports.findAndRemove = function (query) {
    let countOfDeleted = 0;
    if (typeof (query) !== 'string' || query === '') {

        return 0;
    }
    if (query === '*') {
        countOfDeleted = phoneBook.length;
        phoneBook = [];

        return countOfDeleted;
    }
    countOfDeleted = del(query);

    return countOfDeleted;
};

function del(query) {
    let phoneBookClone = phoneBook.slice();
    let countOfDeleted = 0;
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone !== undefined && phoneBook[i].phone.indexOf(query) !== -1 ||
            phoneBook[i].name !== undefined && phoneBook[i].name.indexOf(query) !== -1 ||
            phoneBook[i].email !== undefined && phoneBook[i].email.indexOf(query) !== -1) {
            phoneBookClone.splice(i - countOfDeleted, 1);
            ++countOfDeleted;
        }
    }
    phoneBook = phoneBookClone;

    return countOfDeleted;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */
exports.find = function (query) {
    let notes = [];
    if (typeof (query) !== 'string' || query === '') {

        return [];
    }
    if (query === '*') {
        notes = phoneBook;
    } else {
        notes = getNotes(query);
    }
    if (notes !== [] && notes !== undefined) {
        sorting(notes);
    }
    let arrayNotes = format(notes);

    return arrayNotes;
};

function getNotes(query) {
    let notes = [];
    for (let note of phoneBook) {
        if (note.phone !== undefined && note.phone.indexOf(query) !== -1 ||
            note.name !== undefined && note.name.indexOf(query) !== -1 ||
            note.email !== undefined && note.email.indexOf(query) !== -1) {
            notes.push(note);
        }
    }

    return notes;
}

function sorting(notes) {
    notes.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }

        return 0;
    });
}

function format(notes) {
    let arrayNotes = [];
    for (let note of notes) {
        let noteToArray = note.name + ', +7 (' + note.phone.slice(0, 3) + ') ';
        if (note.phone !== undefined) {
            noteToArray += note.phone.substr(3, 3);
            noteToArray += '-';
            noteToArray += note.phone.substr(6, 2);
            noteToArray += '-';
            noteToArray += note.phone.slice(8);
        }
        if (note.email !== undefined) {
            noteToArray += ', ' + note.email;
        }
        arrayNotes.push(noteToArray);
    }

    return arrayNotes;
}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    if (typeof (csv) !== 'string' || csv === '') {

        return 0;
    }
    let countOfAddOrUpdate = 0;
    let csvToArr = csv.split('\n');
    countOfAddOrUpdate = getCountOfAddOrUpdate(csvToArr);

    return countOfAddOrUpdate;
};

function getCountOfAddOrUpdate(csvToArr) {
    let countOfAddOrUpdate = 0;
    for (let i = 0; i < csvToArr.length; i++) {
        let arr = csvToArr[i].split(';');
        if (arr.length > 3) {
            break;
        }
        let name = arr[0];
        let phone = arr[1];
        let email = arr[2];
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            countOfAddOrUpdate++;
        }
    }

    return countOfAddOrUpdate;
}
