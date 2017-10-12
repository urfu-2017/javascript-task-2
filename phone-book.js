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
        this.phoneBook[phone] = [phone, name, email];
    }
    let flag = checkArguments(phone, name);
    if (flag) {
        if (!reapitEntry(this.phoneBook, phone, email)) {

            return false;
        }
        this.phoneBook[phone] = [phone, name, email];
    }

    return flag;
};

function reapitEntry(book, phone, email) {
    for (var elem in book) {
        if (phone === book[elem][0] || email === book[elem][2]) {

            return false;
        }
    }

    return true;
}

function checkArguments(phone, name) {
    if (phone.length !== 10) {

        return false;
    }
    if (name === 'Неизвестный') {
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
    for (var elem in this.phoneBook) {
        if (phone === this.phoneBook[elem][0]) {
            this.phoneBook[elem][1] = name;
            this.phoneBook[elem][2] = email;

            return true;
        }
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
    for (var i = 0; i < result.length; i++) {
        let index = result[i].indexOf('+');
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
        return '';
    }
    let result = [];
    result = (query === '*') ? pushTwo(this.phoneBook) : pushTree(this.phoneBook, query);

    return result.sort();
};

function pushTwo(book) {
    let result = [];
    for (var elem in book) {
        if (book.hasOwnProperty(elem)) {
            result.push(createLine(book, elem));
        }
    }

    return result;
}

function pushTree(book, query) {
    let result = [];
    for (var number in book) {
        if (book.hasOwnProperty(number)) {
            result.push(createComplexLine(book, number, query));
        }
    }

    return result;
}

function createLine(book, number) {
    return (book[number][2] !== undefined) ? book[number][1] + ' ' +
    translatePhone(number) + ' ' + book[number][2] : book[number][1] + ' ' +
    translatePhone(number);
}

function createComplexLine(book, number, query) {
    return (book[number][2] === undefined) ? withoutEmail(book,
        number, query) : withEmail(book, number, query);
}

function withoutEmail(book, number, query) {
    let result = '';
    if (book[number][0].indexOf(query) !== -1 ||
    book[number][1].indexOf(query) !== -1) {
        result = book[number][1] + ' ' + translatePhone(number);
    }

    return result;
}

function withEmail(book, number, query) {
    let result = '';
    if (book[number][0].indexOf(query) !== -1 ||
    book[number][1].indexOf(query) !== -1 ||
    book[number][2].indexOf(query) !== -1) {
        result = book[number][1] + ' ' + translatePhone(number) +
        ' ' + book[number][2];
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
        if (exports.add(parts[1], parts[0], parts[2]) === false) {
            exports.update(parts[1], parts[0], parts[2]);
        }
    }

    return csv.split('\n').length;
};
