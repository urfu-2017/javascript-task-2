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
let regul = new RegExp(/^(5{3})(\d{3})(\d{2})(\d{2})$/);
exports.add = function (phone, name, email) {
    let added = false;
    if (name && regul.test(phone) && !phoneBook.hasOwnProperty(phone)) {
        added = true;
        phoneBook[phone] = [name, email];
    }

    return added;
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
    if (phoneBook[key][1]) {
        NewUser = phoneBook[key][0] + ', ' + CorrectPhone + ', ' + phoneBook[key][1];
    } else {
        NewUser = phoneBook[key][0] + ', ' + CorrectPhone;
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
    for (let i = 0; mass.length > i; i++) {
        let str = mass[i].split(';');
        let name = str[0];
        let phone = str[1];
        let email = str[2] || '';
        if (phoneBook[phone]) {
            phoneBook[phone][0] = name;
            phoneBook[phone][1] = email;
            Import++;
        }
        if (phone && name && regul.test(phone) && !phoneBook.hasOwnProperty(phone)) {
            phoneBook[phone] = [name, email];
            Import ++;
        }
    }

    return Import;
};
