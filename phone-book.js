'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = {};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
let regul = /^\d{10}$/;
exports.add = function (phone, name, email) {
    if (name && regul.test(phone) && !phoneBook.hasOwnProperty(phone)) {
        email = email || '';
        phoneBook[phone] = [name, email];

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.update = function (phone, name, email) {
    email = email || '';
    if (name && phoneBook.hasOwnProperty(phone)) {
        phoneBook[phone][0] = name;
        phoneBook[phone][1] = email;

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

function removeInObj(query) {
    let remove = 0;
    query = query || '';
    for (let key in phoneBook) {
        if (key.indexOf(query) !== -1) {
            delete phoneBook[key];
            remove++;
        } else if (phoneBook[key][0].indexOf(query) !== -1 ||
         phoneBook[key][1].indexOf(query) !== -1) {
            delete phoneBook[key];
            remove++;
        }
    }

    return remove;
}

exports.findAndRemove = function (query) {
    if (!query) {
        return 0;
    }
    if (query === '*') {

        return removeInObj();
    }

    return removeInObj(query);
};

function correctVivod(key) {
    let NewUser = '';
    let CorrectPhone = '+7 (' + key.slice(0, 3) + ') ' + key.slice(3, 6) + '-' +
key.slice(6, 8) + '-' + key.slice(8, 10);
    NewUser += phoneBook[key][0] + ', ';
    NewUser += CorrectPhone;
    if (phoneBook[key][1]) {
        NewUser += ', ' + phoneBook[key][1];
    }

    return NewUser;
}

function search(query) {
    let Search = [];
    query = query || '';
    for (let key in phoneBook) {
        if (key.indexOf(query) !== -1) {
            Search.push(correctVivod(key));
        } else if (phoneBook[key][0].indexOf(query) !== -1 ||
         phoneBook[key][1].indexOf(query) !== -1) {
            Search.push(correctVivod(key));
        }
    }

    return Search.sort();
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

exports.find = function (query) {
    if (!query) {
        return [];
    }
    if (query === '*') {

        return search();
    }

    return search(query);
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let Import = 0;
    let mass = csv.split('\n');
    for (let line of mass) {
        let str = line.split(';');
        let result = this.add(str[1], str[0], str[2]);
        if (!result) {
            result = this.update(str[1], str[0], str[2]);
        }
        if (result) {
            Import += 1;
        }
    }

    return Import;
};
