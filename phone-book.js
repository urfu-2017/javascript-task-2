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

exports.correctInput = function (phone, name, email) {
    var correctPhone = (/\d{10}/.test(phone)) && (phone[0] === phone[1]) &&
    (phone[1] === phone[2]) && (phone[3] === phone[4]) && (phone[4] === phone[5]) &&
    (phone[6] === phone[7]) && (phone[8] === phone[9]);
    var correctName = (typeof name === 'string' && name.length > 0);
    var correctEmail = (typeof email === 'undefined') || (typeof email === 'string');

    return (correctPhone && correctName && correctEmail);
};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @returns {boolean}
 * @param {String} name
 * @returns {boolean}
 * @param {String} email
 * @returns {boolean}
 */
exports.add = function (phone, name, email) {
    var exist = (phoneName) => {
        if (phoneName.phone === phone) {

            return true;
        }

        return false;
    };
    if ((typeof name !== 'string') || (name.length === 0) || phoneBook.some(exist)) {

        return false;
    }
    if (exports.correctInput(phone, name, email) && (email === undefined)) {
        phoneBook.push({ phone: phone, name: name });

        return true;
    }
    if (exports.correctInput(phone, name, email)) {
        phoneBook.push({ phone: phone, name: name, email: email });

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
exports.update = function (phone, name, email) {
    if (exports.correctInput(phone, name, email)) {
        phoneBook.forEach((contact) => {
            if (contact.phone === phone) {
                contact.name = name;
                if (email !== undefined) {
                    contact.email = email;
                }
                if (email === undefined) {
                    delete contact.email;
                }
            }
        });

        return true;
    }

    return false;
};

exports.willrec = (contact, query) => {
    var key = Object.keys(contact);
    for (let i = 0; i < key.length; i++) {
        if ((contact[key[i]] !== undefined) && (contact[key[i]].indexOf(query) !== -1)) {
            return true;
        }
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 *@returns {Number}
 */
exports.findAndRemove = function (query) {
    var newphoneBook = [];
    var deletedCount = 0;
    var phoneL = phoneBook.length;
    if (query === '') {
        return 0;
    }
    if (query === '*') {
        var n = phoneBook.length;
        phoneBook = [];

        return n;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (!exports.willrec(phoneBook[i], query)) {
            newphoneBook.push(phoneBook[i]);
            deletedCount++;
        }
    }
    phoneBook = newphoneBook;

    return phoneL - deletedCount;
};

exports.changePhone = (phone) => {
    var newPhone = '+7 (' + phone.substring(0, 3) + ') ' + phone.substring(3, 6) +
    '-' + phone.substring(6, 8) + '-' + phone.substring(8, 10);

    return newPhone;
};

exports.deletelast = (str) => {
    var a = str.length;
    if (str[a - 1] === ' ') {
        var str1 = str.slice(0, a - 2);

        return str1;
    }

    return str;
};


/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 *@returns {Array}
 */
exports.find = function (query) {
    var asc = (field) => { // функция для сортировки по возрастанию
        return (x, y) => {
            return x[field] > y[field];
        };
    };
    var resultBook = [];
    phoneBook.sort(asc('name'));
    if (query === '' || typeof query !== 'string') {
        return [];
    }

    phoneBook.forEach((contact) => {
        if (query === '*' || exports.willrec(contact, query)) {
            var newphone = contact.phone;
            var newContact = contact.name + ', ' + exports.changePhone(newphone) +
            ', ' + (contact.email || '');
            var newContact1 = exports.deletelast(newContact);
            resultBook.push(newContact1);
        }
    });

    return resultBook;
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
    if (!csv) {
        return 0;
    }
    let records = csv.split('\n');
    let record;
    let countUpdate = 0;
    records.forEach((rec) => {
        record = rec.split(';');
        if ((exports.add(record[1], record[0], record[2])) ||
         exports.update(record[1], record[0], record[2])) {
            countUpdate++;
        }
    }
    );

    return countUpdate;
};

