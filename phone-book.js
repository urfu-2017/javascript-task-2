'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

/**
 * Телефонная книга
 */
var phoneBook = [];

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {bool}
 */

exports.add = function (phone, name, email) {
    if (!isCorrectContact(phone, name)) {
        return false;
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            return false;
        }
    }
    let item = {
        'name': name,
        'phone': phone,
        'email': email
    };
    phoneBook.push(item);

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {bool}
 */

exports.update = function (phone, name, email) {
    if (!isCorrectContact(phone, name)) {
        return false;
    }
    for (const item of phoneBook) {
        if (item.phone === phone) {
            item.name = name;
            item.email = email;

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
    if (typeof query !== 'string' || query === '') {
        return 0;
    }
    if (query === '*') {
        let countItemsForRemove = phoneBook.length;
        phoneBook = [];

        return countItemsForRemove;
    }
    let count = [];
    count = findAndDelete(query);

    return deleting(count);

};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

exports.find = function (query) {
    query = String(query);
    let queryArray = [];
    if (!query) {
        return queryArray;
    }
    if (query === '*') {
        queryArray = findAllContacts();
    } else {
        queryArray = findContact(query);
    }

    return queryArray.sort();
};

function isCorrectContact(phone, name) {
    if (!phone || typeof(phone) !== 'string' || !conversationPhone(phone)) {
        return false;
    }
    if (!name || typeof(name) !== 'string') {
        return false;
    }

    return true;
}

function conversationPhone(phone) {
    var items = /^(\d{3})(\d{3})(\d{2})(\d{2})$/.exec(phone);
    if (items === null) {
        return '';
    }

    return '+7 (' + items[1] + ') ' + items[2] + '-' + items[3] + '-' + items[4];
}

function findAllContacts() {
    let findArray = [];
    for (const { name, phone, email } of phoneBook) {
        findArray.push(name + ', ' + conversationPhone(phone) + addEmail(email));
    }

    return findArray;
}

function addEmail(email) {
    if (email) {
        return ', ' + email;
    }
    if (!email) {
        return '';
    }
}

function findContact(query) {
    let findArray = [];
    for (const { name, phone, email } of phoneBook) {
        let n = name.indexOf(String(query));
        let p = phone.indexOf(String(query));
        let em = -1;
        if (email) {
            em = email.indexOf(String(query));
        }
        if (n !== -1 || p !== -1 || em !== -1) {
            findArray.push(name + ', ' + conversationPhone(phone) + addEmail(email));
        }
    }

    return findArray;
}

function findAndDelete(query) {
    let listCount = [];
    let count = 0;
    for (const e of phoneBook) {
        let n = e.name.indexOf(String(query));
        let p = e.phone.indexOf(String(query));
        let em = -1;
        if (e.email) {
            em = e.email.indexOf(String(query));
        }
        if (n !== -1 || p !== -1 || em !== -1) {
            listCount.push(count);
        }
        count += 1;
    }

    return listCount;
}

function deleting(list) {
    for (const e of list) {
        phoneBook.splice(e - list.indexOf(e), 1);
    }

    return list.length;
}
