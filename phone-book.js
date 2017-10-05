'use strict';

exports.isStar = true;

let phoneBook = [];

function isCorrectPhone(phone) {
    return /^(\d){10}$/.test(phone);
}

function phoneFormat(phone) {
    return '+7 (' + phone.slice(0, 3) + ') ' +
        phone.slice(3, 6) + '-' + phone.slice(6, 8) +
        '-' + phone.slice(8, 10);
}

function phoneToPrint(value) {
    let result = value.name + ', ' + phoneFormat(value.phone);
    if (value.email) {
        result += ', ' + value.email;
    }

    return result;
}

function searchToQuery(value, query) {
    return value.phone.indexOf(query) !== -1 ||
        value.name.indexOf(query) !== -1 ||
        value.email.indexOf(query) !== -1;
}

function isCorrectData(phone, name, email) {
    return typeof phone === 'string' && isCorrectPhone(phone) &&
        typeof name === 'string' && name !== '' &&
        (typeof email === 'string' && email !== '' || email === undefined);
}

function getIndexPhone(phone) {
    return phoneBook.findIndex(
        function (value) {
            return value.phone === phone;
        });
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    if (isCorrectData(phone, name, email) &&
        getIndexPhone(phone) === -1) {
        if (!email) {
            email = '';
        }
        phoneBook.push({
            'name': name,
            'phone': phone,
            'email': email
        });

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    let newIndex = getIndexPhone(phone);
    if (isCorrectData(phone, name, email) && newIndex !== -1) {
        phoneBook[newIndex].name = name;
        phoneBook[newIndex].email = (email) ? email : '';

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
    if (typeof query !== 'string' || query === '') {

        return 0;
    }
    let oldLen = phoneBook.length;
    if (query === '*') {
        phoneBook = [];
    } else {
        phoneBook = phoneBook.filter(
            function (value) {
                return !searchToQuery(value, query);
            });
    }
    let newLen = phoneBook.length;

    return oldLen - newLen;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    if (typeof query !== 'string' || query === '') {

        return [];
    }

    if (query === '*') {

        return phoneBook
            .map(phoneToPrint)
            .sort();
    }

    return phoneBook
        .filter(
            function (value) {
                return searchToQuery(value, query);
            })
        .map(phoneToPrint)
        .sort();
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    if (typeof csv !== 'string' || csv === '') {

        return 0;
    }
    let contacts = csv.split('\n').filter(
        function (contact) {
            contact = contact.split(';');
            if (contact.length > 3) {

                return false;
            }

            return exports.add(contact[1], contact[0], contact[2]) ||
                exports.update(contact[1], contact[0], contact[2]);
        });


    return contacts.length;
};
