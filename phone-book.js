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
 * @returns {boolean}
 */

function isValid(phone, name) {
    const regForPhone = /^\d{10}$/;
    if (Boolean(phone) && Boolean(name) && regForPhone.test(phone)) {
        return true;
    }

    return false;
}
exports.add = function (phone, name, email) {
    if (!isValid(phone, name, email)) {
        return false;
    }
    for (let element of phoneBook) {
        if (element.phone === phone) {
            return false;
        }
    }
    phoneBook.push({ name, phone, email });

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean}
 */
exports.update = function (phone, name, email) {
    if (!isValid(phone, name, email)) {
        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone.toString()) {
            phoneBook[i].name = name;
            phoneBook[i].email = email;

            return true;
        }
    }

    return false;
};


/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {int}
 */
exports.findAndRemove = function (query) {
    let count = 0;
    if (!query || typeof query !== 'string') {
        return 0;
    }

    for (let i = 0; i < phoneBook.length; i++) {
        if (toCheck(query, phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email)) {
            phoneBook.splice(i, 1);
            i--;
            count++;
        }
    }

    return count;
};

function toDoABeautifulPhone(phone, name, email) {
    let string = name + ', +7 (' + phone.slice(0, 3) + ') ' +
        phone.slice(3, 6) + '-' + phone.slice(6, 8) + '-' +
        phone.slice(8, 10);
    if (email !== undefined) {
        string += ', ' + email;
    }

    return string;

}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    let result = [];
    if (!query) {
        return [];
    }
    if (query === '*') {
        for (let i = 0; i < phoneBook.length; i++) {
            result.push(toDoABeautifulPhone(
                phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email)
            );
        }
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (toCheck(query, phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email)) {
            result.push(toDoABeautifulPhone(
                phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email)
            );
        }
    }

    return result.sort();
};

function toCheck(query, phone, name, email) {
    return name.indexOf(query) !== -1 ||
        phone.indexOf(query) !== -1 ||
        (email !== undefined && email.indexOf(query) !== -1);
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
    let elems = csv.split('\n');
    let count = 0;
    for (let elem of elems) {
        let [name, phone, email] = elem.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            count++;
        }
    }

    return count;
};
