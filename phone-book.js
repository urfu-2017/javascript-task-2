/* jshint maxcomplexity:false */

'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook;

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    if (this.phoneBook === undefined) {
        this.phoneBook = {};
        if (!checkArguments(phone, name)) {
            return false;
        }
        this.phoneBook[phone] = [phone, name, email];

        return true;
    }
    let flag = checkArguments(phone, name);
    if (flag) {
        if (!reapitEntry(this.phoneBook, phone)) {

            return false;
        }
        this.phoneBook[phone] = [phone, name, email];
    }

    return flag;
};

function reapitEntry(book, phone) {
    for (var elem in book) {
        if (phone === book[elem][0]) {

            return false;
        }
    }

    return true;
}

function checkArguments(phone, name) {
    if (phone === undefined) {
        return false;
    }
    if (phone.length !== 10) {

        return false;
    }
    if (isNaN(Number(phone))) {
        return false;
    }
    if (name === 'Неизвестный' || name === undefined) {
        return false;
    }

    return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    if (name === 'Неизвестный' || name === undefined) {

        return false;
    }
    if (phone === this.phoneBook[phone][0]) {
        this.phoneBook[phone][1] = name;
        this.phoneBook[phone][2] = email;

        return true;
    }

    return false;

};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    let result = exports.find(query);
    let newPhone = '';
    let index = 0;
    for (var i = 0; i < result.length; i++) {
        index = result[i].indexOf('+7');
        newPhone = transfomPhone(result[i].slice(index, index + 19));
        delete this.phoneBook[newPhone];
    }

    return result.length;
};

function transfomPhone(phone) {
    if (phoneBook !== undefined) {
        phone.slice(4, 7);
    }
    let nums = phone.slice(4, 7) + phone.slice(9, 12) + phone.slice(13, 15) + phone.slice(16, 19);

    return nums;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {[String]}
 */
exports.find = function (query) {
    if (query === '') {
        return [];
    }
    let result = [];
    result = (query === '*') ? allPersons(this.phoneBook) : allMath(this.phoneBook, query);

    return result.sort();
};

function allPersons(book) {
    let result = [];
    for (var number in book) {
        if (book.hasOwnProperty(number)) {
            result.push(createLine(book, number));
        }
    }

    return result;
}

function createLine(book, number) {
    return (book[number][2] === undefined) ? book[number][1] +
    ', ' + translatePhone(number) : book[number][1] + ', ' + translatePhone(number) +
    ', ' + book[number][2];
}

function allMath(book, query) {
    let result = [];
    for (var number in book) {
        if (book[number][0].indexOf(query) !== -1 ||
        book[number][1].indexOf(query) !== -1 ||
        (book[number][2] !== undefined && book[number][2].indexOf(query) !== -1)) {
            result.push(createLine(book, number));
        }
    }

    return result;
}

function translatePhone(number) {
    return '+7 (' + number.slice(0, 3) + ') ' + number.slice(3, 6) +
    '-' + number.slice(6, 8) + '-' + number.slice(8, 10);
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
    let persons = csv.split('\n');
    let parts = [];
    for (var i = 0; i < persons.length; i++) {
        parts = persons[i].split(';');
        exports.add(parts[1], parts[0], parts[2]);
        exports.update(parts[1], parts[0], parts[2]);
    }

    return Object.keys(this.phoneBook).length;
};
