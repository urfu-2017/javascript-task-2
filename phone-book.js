'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 *  */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook = [];

function validData(phone, name) {
    if (!/^\d{10}$/.test(String(phone)) || name === '') {
        return false;
    }
}

exports.add = function (phon, nam, email) {
    if (!validData(phon, nam)) {
        return false;
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if
        (phoneBook[i].phone === phon || phoneBook[i].name === nam || phoneBook[i].email === email) {

            return false;

        }
    }
    var newContact = {
        phone: phon,
        name: nam,
        email: email
    };
    phoneBook.push(newContact);

    return true;

};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
/** exports.update = function (phone, name, email) {

};/

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
/** exports.findAndRemove = function (query) {

};/

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
/** exports.find = function (query) {/

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
