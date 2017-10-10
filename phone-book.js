'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook;

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.add = function(phone, name, email) {
    phone = String(phone);
    if (name === '' || (phone.length !== 10 && phone.length !== 0)) return false;
    if (phone === undefined) phone = '';
    if (email === undefined) email = '';
    for (i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].name === name || phoneBook[i].phone === phone || phoneBook[i].email === email) return false;
    }
    phoneBook.push({
        name: name,
        phone: phone,
        email: email
    });
    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.update = function (phone, name, email) {

};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
exports.findAndRemove = function (query) {

};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function (query) {

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
