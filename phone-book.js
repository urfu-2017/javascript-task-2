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
    let reg = /(\d)\1\1(\d)\2\2(\d)\3(\d)\4/;
    let contact = { phone: phone, name: name, email: email };
    if (isNoteInPhoneBook(contact)) {
        return false;
    }
    if (isDataCorrect(contact.phone) && isDataCorrect(contact.name) &&
        contact.email !== '' && contact.phone.match(reg) !== null) {
        phoneBook.push(contact);

        return true;

    }

    return false;

};

function isDataCorrect(str) {
    if (typeof(str) !== 'string' || str === '') {

        return false;
    }

    return true;

}

function isNoteInPhoneBook(contact) {
    for (let note of phoneBook) {
        if (contact.phone === note.phone) {
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
    if (!isDataCorrect(name) || !isDataCorrect(phone)) {

        return false;
    }
    let contact = { phone: phone, name: name, email: email };
    for (let note of phoneBook) {
        if (contact.phone === note.phone) {
            note.name = contact.name;
            note.email = contact.email;

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
    let phoneBookClone = phoneBook.slice();
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone !== undefined && phoneBook[i].phone.indexOf(query) !== -1 ||
            phoneBook[i].name.indexOf(query) !== -1 ||
            phoneBook[i].email !== undefined && phoneBook[i].email.indexOf(query) !== -1) {
            phoneBookClone.splice(i - countOfDeleted, 1);
            ++countOfDeleted;
        }
    }
    if (query === '*') {
        countOfDeleted = phoneBook.length;
        phoneBook.splice(0, phoneBook.length);

        return countOfDeleted;
    }
    phoneBook = phoneBookClone;

    return countOfDeleted;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Bool}
 */
exports.find = function (query) {
    let notes = [];
    for (let note of phoneBook) {
        if (note.phone !== undefined && note.phone.indexOf(query) !== -1 ||
            note.name.indexOf(query) !== -1 ||
            note.email !== undefined && note.email.indexOf(query) !== -1) {
            notes.push(note);
        }
    }
    if (query === '*') {
        notes = phoneBook;
    }
    sorting(notes);
    let arrayNotes = format(notes);

    return arrayNotes;
};

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
    if (typeof csv !== 'string' || csv === '') {

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
        if (exports.add(phone, name, email)) {
            countOfAddOrUpdate++;
        } else if (exports.update(phone, name, email)) {
            countOfAddOrUpdate++;
        }
    }

    return countOfAddOrUpdate;
}

