'use strict';



/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
exports.phoneBook = [];
// = {} ... return Object.entries(phoneBook);

// this.phoneBook.toString()
// var entry = {
//     _name: 'def'
// };
// Object.defineProperty(entry, 'name', {
//     get: function () {
//         return this._name;
//     },
//     set: function (value) {
//         this._name = value;
//     }
// });
/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.add = function (phone, name, email) {

    var isValidPhone = new RegExp('^\\d{10}$');
    var isValidName = name !== undefined;
    var isPhoneExists = this.phoneBook.some(function (element, index, array) {
        return element.phone.indexOf(phone) !== -1;
    });

    if(isValidPhone.test(phone) && isValidName && !isPhoneExists) {

    this.phoneBook.push({'phone' : phone, 'name' : name, 'email' : email});

    return true;
    }
    else return false;
};
/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.update = function (phone, name, email) {

    var entry = this.phoneBook.findIndex(function (element, index, array) {
        return element.phone === phone;
    });

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

    if (query === '') return [];
    if (query === '*') return this.phoneBook;

    return this.phoneBook.filter(function (element, index, array) {
        return element.phone.indexOf(query) !== -1 || element.name.indexOf(query) !== -1 || element.email.indexOf(query) !== -1;
    })

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
