/* eslint-disable max-depth */
'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = []; // {};
const regExpPhone = /^(\d{10})$/;


// const regExpEmail = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;

/**
 * @param {string} phone1
 * @returns {boolean}
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

    return (((regExpPhone.test(phone) &&
        (Boolean(email) || email === undefined) &&
        name !== undefined))) && !isNaN(Number(phone)) && isString(name);
}
function correctPhone(phone) {
    return `+7 (${phone.slice(0, 3)}) ` +
        `${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}`;
}

/* function isItGood2(phone, name, email) {
    return ((regExpPhone.test(phone) &&
        (Boolean(email) || email === undefined))) && !isNaN(Number(phone)) && isString(name);
}*/

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.add = function add(phone, name, email) {
    if (isItGood(phone, name, email) && !alreadyAdd(phone)) {
        let phoneCard = {
            phone,
            name,
            email// : email === '' ? undefined : email
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
 * @returns {boolean}
 */
exports.update = function update(phone, name, email) {
    if (isItGood(phone, name, email)) {
        for (let inf of phoneBook) {
            if (inf.phone === phone) {
                inf.name = name;
                inf.email = email; // === '' ? email.replace(undefined, '') : email;

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
    if (query === '*') {
        let res1 = phoneBook.length;
        phoneBook = [];

        return res1;
    }
    if (query === '') {
        return 0;
    }
    let newPhoneBook = phoneBook.filter(function (record) {
        if (record.name.indexOf(query) !== -1 || record.phone.indexOf(query) !== -1) {
            return true;
        }
        if (record.email) {
            return record.email.indexOf(query) !== -1;
        }

        return false;
    });
    for (let i = 0; i < newPhoneBook.length; i++) {
        phoneBook.splice(phoneBook.indexOf(newPhoneBook[i]), 1);
    }

    return newPhoneBook.length;

};
exports.find = function find(query) {
    let newPhoneBook = [];
    if (query === '') {
        return newPhoneBook;
    }
    if (query === '*') {
        for (let i = 0; i < phoneBook.length; i++) {
            newPhoneBook.push(outOfString(phoneBook[i].name,
                phoneBook[i].phone,
                phoneBook[i].email));

        }
    }
    let res = phoneBook.filter(function (record) {
        if (record.name.indexOf(query) !== -1 || record.phone.indexOf(query) !== -1) {
            return true;
        }
        if (record.email) {
            return record.email.indexOf(query) !== -1;
        }

        return false;
    });
    for (let j = 0; j < res.length; j++) {
        newPhoneBook.push(outOfString(res[j].name, res[j].phone, res[j].email));
    }

    return (newPhoneBook.sort());


};

function outOfString(name, phone, email) {
    let newPhoneBook = name;
    if (phone !== undefined) {
        newPhoneBook = newPhoneBook + ', ' + correctPhone(phone);
    }
    if (email !== undefined) {
        newPhoneBook = newPhoneBook + ', ' + email;
    }

    return newPhoneBook;
}


/* function deleter(ai, m) {
    return ai.filter(val => !m.includes(val));
}
*/
/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    // Парсим csv
    let count = 0;
    let lines = csv.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let contact = lines[i].split(';');
        if (this.add(contact[1], contact[0], contact[2]) ||
            this.update(contact[1], contact[0], contact[2])) {
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
