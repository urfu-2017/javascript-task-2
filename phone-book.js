'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = [];

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.add = function (phone, name, email) {
    let re = /^\d{10}$/;
    if (!re.test(phone) || name === '' || typeof (name) === 'undefined') {
        return false;
    }
    for (let phoneNumber of phoneBook) {
        if (phoneNumber.phone === phone) {
            return false;
        }
    }
    phoneBook.push({ phone, name, email });

    return true;
};

/*
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.update = function (phone, name, email) {
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone && name !== undefined) {
            phoneBook[i].name = name;
            phoneBook[i].email = email;

            return true;
        }
    }
};

/*
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
exports.findAndRemove = function (query) {
    let iteration = 0;
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].name.indexOf(query) !== -1 ||
            phoneBook[i].phone.indexOf(query) !== -1 ||
            (phoneBook[i].email !== undefined) && phoneBook[i].email.indexOf(query) !== -1) {
            phoneBook.splice(i, 1);
            i--;
            iteration++;
        }
    }

    return iteration;
};

/*
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
function formContact(phone, name, email) {
    let formOfContact = [];
    formOfContact.name = name;
    formOfContact.phone = '+7 (' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' +
     phone.slice(6, 8) + '-' + phone.slice(8, 10);
    formOfContact.email = email;
    if (email === undefined) {
        formOfContact.email = '';
        let str = formOfContact.name + ', ' + formOfContact.phone;

        return str;
    }
    let str = formOfContact.name + ', ' + formOfContact.phone + ', ' + formOfContact.email;

    return str;
}

exports.find = function (query) {
    let findResult = [];
    if (query === '*') {
        for (let i = 0; i < phoneBook.length; i++) {
            let phone = phoneBook[i].phone;
            let name = phoneBook[i].name;
            let email = phoneBook[i].email;
            findResult[i] = formContact(phone, name, email);
        }
    } else {
        for (let i = 0; i < phoneBook.length; i++) {
            if (phoneBook[i].phone.indexOf(query) !== -1) { // eslint-disable-line max-depth
                let phone = phoneBook[i].phone;
                let name = phoneBook[i].name;
                let email = phoneBook[i].email;
                findResult[i] = formContact(phone, name, email);
            }
        }
    }

    return findResult.sort();
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
    let stringsCSV = csv.split('\n');
    let iteration = 0;
    for (let i = 0; i < stringsCSV.length; i++) {
        let arrayString = stringsCSV[i].split(';');
        let name = arrayString[0];
        let phone = arrayString[1];
        let email = arrayString[2];
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            iteration++;
        }
    }

    return iteration;
};
