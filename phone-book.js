/* eslint-disable max-len,valid-jsdoc,default-case,max-depth,no-unused-vars,linebreak-style,complexity */
'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

const { save, load } = require('./import');

/**
 * Телефонная книга
 */
let phoneBook = []; // {};
const regExpPhone = /^(\d{10}|\d{12})$/;
const regExpEmail = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;

/**
 * @return {boolean}
 */
function alreadyAdd(phone1) {
    for (let i = 0; phoneBook.length > i; i++) {
        if ((phoneBook[i].phone === phone1)) {
            return true;
        }
    }
}

function isString(query) {
    let a = typeof query;

    return a === 'string';
}

function isItGood(phone, name, email) {

    return (((regExpPhone.test(phone) === true &&
        ((regExpEmail.test(email) === true) || email === undefined) &&
        name !== undefined)) && !alreadyAdd(phone));
    // Object.keys(phoneBook).indexOf(phone) === -1);
}
function correctPhone(phone) {
    return `+7 (${phone.slice(0, 3)}) ` +
        `${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}`;
}

function isItGood2(phone, name, email) {
    return ((regExpPhone.test(phone) === true &&
        ((regExpEmail.test(email) === true) || email === undefined) &&
        name !== undefined));
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.add = function add(phone, name, email) {
    if (isItGood(phone, name, email)) {
        let phoneCard = {
            phone,
            name,
            email: email === '' ? undefined : email
        };
        phoneBook.push(phoneCard);

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
exports.update = function update(phone, name, email) {
    if (isItGood2(phone, name, email)) {
        for (let inf of phoneBook) {
            if (inf.phone === phone) {
                inf.name = name;
                inf.email = email === '' ? email.replace(undefined, '') : email;

                return true;
            }
        }


    }

    return false;

};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

exports.findAndRemove = function findAndRemove(query) {
    let c = 0;
    if (isString(query)) {
        for (let i = 0; phoneBook.length > i; i++) {
            if ((phoneBook[i].phone + phoneBook[i].name + phoneBook[i].email).search(query) !== -1) {
                c++;
            }
        }

        return c;
    }

    return false;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function find(query) {
    let founded = [];
    if (query === '') {
        return false;
    }
    query = query.replace('*', '');
    if (isString(query)) {
        for (let i = 0; phoneBook.length > i; i++) {
            if ((phoneBook[i].phone + phoneBook[i].name + phoneBook[i].email).search(query) !== -1 || query === '') {
                let phoneCardFounded =
                    (`${phoneBook[i].name}, ${correctPhone(phoneBook[i].phone)}${phoneBook[i].email ? ', ' + phoneBook[i].email : ''}`);
                founded.push(phoneCardFounded);
            }
        }

        return founded.sort();
    }

    return false;
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
/* exports.importFromCsv = function (csv) {
    // Парсим csv
    csv = [] || load();
    let count = 0;
    let lines = csv.split('\n');
    for (let i = 0; i < lines.length - 1; i++) {
        let contact = lines[i].split(';');
        if (this.add(contact[0], contact[1], contact[2])) {
            count++;
        }
    }
    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует

    return count;
};
*/
