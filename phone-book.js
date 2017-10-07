'use strict';

const PHONE_REGEXP = new RegExp(/^\d\d\d\d\d\d\d\d\d\d$/);

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;
exports.add = add;
exports.update = update;
exports.find = find;
exports.findAndRemove = findAndRemove;

/**
 * Телефонная книга
 */
var phoneBook = [];

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Bool} 
 */
function add(phone, name, email) {
    if (!isValidEntry(phone, name) || phoneBook.some(e => e.phone === phone)) {
        return false;
    }

    email = typeof(email) === 'string' ? email : '';
    phoneBook.push({ phone, name, email });

    return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Bool}
 */
function update(phone, name, email) {
    if (!isValidEntry(phone, name)) {
        return false;
    }

    email = typeof(email) === 'string' ? email : '';

    for (let i in phoneBook) {
        if (phoneBook[i].phone === phone) {
            phoneBook[i] = { phone, name, email };

            return true;
        }
    }

    return false;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
function find(query) {
    if (typeof(query) !== 'string' || query === '') {
        return undefined;
    }
    if (query === '*') {
        return formatPhoneBook(phoneBook);
    }

    return formatPhoneBook(phoneBook.filter(e => Object.values(e).some(v => v.includes(query))));
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} – количество удаленных записей
 */
function findAndRemove(query) {
    let count = phoneBook.length;

    if (typeof(query) !== 'string' || query === '') {
        return 0;
    }
    if (query === '*') {
        phoneBook = [];

        return count;
    }

    phoneBook = phoneBook.filter(e => !Object.values(e).some(v => v.includes(query)));

    return count - phoneBook.length;
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
    let count = 0;

    for (let line of csv.split('\n')) {
        let [name, phone, email] = line.split(';');

        if (add(phone, name, email) || update(phone, name, email)) {
            count += 1;
        }
    }

    return count;
};

function isValidEntry(phone, name) {
    return typeof(name) === 'string' &&
    typeof(phone) === 'string' &&
    name !== '' &&
    PHONE_REGEXP.test(phone);
}

function formatPhoneBook(book) {
    let result = [];

    for (let entry of book) {
        let [phone, name, email] = [entry.phone, entry.name, entry.email];
        let strEntry = name;

        strEntry += `, +7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-` +
        `${phone.slice(6, 8)}-${phone.slice(8)}`;
        strEntry += email === '' ? '' : `, ${email}`;
        result.push(strEntry);
    }

    return result.sort();
}
