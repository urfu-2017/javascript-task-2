'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

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
    if (!checkData(phone, name)) {
        return false;
    }
    for (const el of phoneBook) {
        if (el.phone === phone) {
            return false;
        }
    }
    let contact = {
        name,
        phone,
        email
    };
    phoneBook.push(contact);

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.update = function (phone, name, email) {
    if (!checkData(phone, name)) {
        return false;
    }
    for (const contact of phoneBook) {
        if (contact.phone === phone) {
            contact.name = name;
            contact.email = email;

            return true;
        }
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

exports.findAndRemove = function (query) {
    if (query === '') {
        return 0;
    }
    if (query === '*') {
        let count = phoneBook.length;
        phoneBook = [];

        return count;
    }
    let count = [];
    count = findAndDelete(query);

    remover(count);
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

exports.find = function (query) {
    if (!query || typeof(query) !== 'string') {
        return [];
    }
    let findArray = [];
    if (query === '*') {
        findArray = findAll();
    } else {
        findArray = findContacts(query);
    }

    return findArray.sort();
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

    return csv.split('\n').length;
};

function findAll() {
    let findArray = [];
    for (const { name, phone, email } of phoneBook) {
        findArray.push(name + ', ' + remakePhone(phone) + notEmail(email));
    }

    return findArray;
}

function findContacts(query) {
    let findArray = [];
    for (const { name, phone, email } of phoneBook) {
        let n = name.indexOf(String(query));
        let p = phone.indexOf(String(query));
        let e;
        if (email) {
            e = email.indexOf(String(query));
        }
        if (n !== -1 || p !== -1 || e !== -1) {
            findArray.push(name + ', ' + remakePhone(phone) + notEmail(email));
        }
    }

    return findArray;
}

function findAndDelete(query) {
    let listCount = [];
    let count = 0;
    for (const el of phoneBook) {
        let n = el.name.indexOf(String(query));
        let p = el.phone.indexOf(String(query));
        let e = -1;
        if (el.email) {
            e = el.email.indexOf(String(query));
        }
        if (n !== -1 || p !== -1 || e !== -1) {
            listCount.push(count);
        }
        count += 1;
    }

    return listCount;
}

function remover(list) {
    for (const el of list) {
        phoneBook.splice(el - list.indexOf(el), 1);
    }

    return list.length;
}


function notEmail(email) {
    if (!email) {
        return '';
    }
    if (email) {
        return ', ' + email;
    }
}

function checkData(phone, name) {
    if (!phone || !remakePhone(phone) || typeof(phone) !== 'string') {
        return false;
    }
    if (!name || typeof(name) !== 'string') {
        return false;
    }

    return true;
}

function remakePhone(phone) {
    const regExp = /^(\d{3})(\d{3})(\d{2})(\d{2})$/;
    let details = phone.match(regExp);
    if (details === null) {
        return false;
    }

    return '+7 (' + details[1] + ') ' + details[2] + '-' + details[3] + '-' + details[4];
}
