'use strict';
const { Storage } = require('./storage');
const validationRules = require('./validation-rules');
const { PhonebookEntry } = require('./phonebook-entry');
const { formatPhoneEntry } = require('./utils');
const { AllFieldsHandler, AsteriskHandler, EmptyHandler } = require('./search-handlers');

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
let storage = new Storage();

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} operation success
 */
exports.add = function (phone, name, email) {
    let isValid = [
        ...validationRules.name,
        ...validationRules.phone,
        ...validationRules.insertDataIntegrity]
        .every(rule => rule(phone, name, email, storage));
    if (isValid) {
        storage.add(new PhonebookEntry(phone, name, email));
    }

    return isValid;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} operation success
 */
exports.update = function (phone, name, email) {
    let isValid = [
        ...validationRules.name,
        ...validationRules.phone,
        ...validationRules.updateDataIntegrity]
        .every(rule => rule(phone, name, email, storage));
    if (isValid) {
        let old = storage.find(x => x.phone === phone);
        storage.remove(old);
        storage.add(new PhonebookEntry(phone, name, email));
    }

    return isValid;
};

function find(query) {
    return [EmptyHandler, AsteriskHandler, AllFieldsHandler]
        .find(x => x.canHandle(query))
        .handle(query, storage);
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} amount of remove entries
 */
exports.findAndRemove = function (query) {
    let entries = find(query);
    entries.forEach(x => storage.remove(x));

    return entries.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array} list of formatted strings
 */
exports.find = function (query) {
    let entries = find(query)
        .sort((x, y) => x.name.localeCompare(y.name))
        .map(formatPhoneEntry);

    return Array.from(entries);
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

    return csv.split('\n')
        .map(string => [...string.split(';')])
        .filter(fields => fields.length === 3)
        .map(([name, phone, email]) => [phone, name, email])
        .map(fields => exports.add(...fields) || exports.update(...fields))
        .filter(result => result === true)
        .length;
};
