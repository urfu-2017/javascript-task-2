'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Удаление из массива повторных записей
 * @param {Object} arr
 * @returns {Object} - массив без повторных записей
 */
function deleteDuplicates(arr) {
    var obj = {};
    for (let i = 0; i < arr.length; i++) {
        let str = arr[i];
        obj[str] = true;
    }

    return Object.keys(obj);
}

/**
 * Проверка имени и номера телефона на некорректность
 * @param {String} name
 * @param {String} phone
 * @returns {Boolean}
 */
function incorrectNameOrPhone(name, phone) {
    return (typeof name !== 'string' || name === '' || !(/^\d{10}$/.test(phone)));
}

/**
 * Поиск записи по шаблону
 * @param {RegExp} query
 * @param {Object} entry
 * @returns {String} - Найденная по шаблону запись в подходящем формате
 */
function findQueryInEntry(query, entry) {
    let email = '';
    if (typeof entry.email !== 'undefined') {
        email = `, ${entry.email}`;
    }
    let resultString;
    for (let value of Object.values(entry)) {
        if (typeof value !== 'undefined' && value.indexOf(query) !== -1) {
            resultString = `${entry.name}, +7 (${entry.phone.slice(0, 3)}) ${entry.phone.slice(3, 6)}-${entry.phone.slice(6, 8)}-${entry.phone.slice(8)}${email}`; // eslint-disable-line max-len
        }
    }
    if (typeof resultString !== 'undefined') {
        resultString = resultString.replace(/, undefined/g, '');
    }

    return resultString;
}

/**
 * Телефонная книга
 */
var phoneBook = [];

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} – успех операции
 */
exports.add = function (phone, name, email) {
    if (incorrectNameOrPhone(name, phone)) {
        return false;
    }
    for (let phoneEntry of phoneBook) {
        if (phone === phoneEntry.phone) {
            return false;
        }
    }
    phoneBook.push({ phone, name, email });

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} – успех операции
 */
exports.update = function (phone, name, email) {
    if (incorrectNameOrPhone(name, phone)) {
        return false;
    }
    for (let phoneEntry of phoneBook) {
        if (phone === phoneEntry.phone) {
            phoneEntry.name = name;
            phoneEntry.email = email;

            return true;
        }
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} - кол-во удалённых записей
 */
exports.findAndRemove = function (query) {
    let deletionCounter = 0;
    if (query === '') {
        return 0;
    }
    if (query === '*') {
        query = '';
    }
    for (let i = phoneBook.length - 1; i > -1; i--) {
        let str = findQueryInEntry(query, phoneBook[i]);
        if (typeof str !== 'undefined') {
            phoneBook.splice(i, 1);
            deletionCounter++;
        }
    }

    return deletionCounter;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Boolean} – успех операции
 */
exports.find = function (query) {
    let result = [];
    if (query === '') {
        return [];
    }
    if (query === '*') {
        query = '';
    }
    for (let phoneEntry of phoneBook) {
        let str = findQueryInEntry(query, phoneEntry);
        if (typeof str !== 'undefined') {
            result.push(str);
        }
    }
    result = deleteDuplicates(result);
    result.sort();

    return result;
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    let csvNumber = 0;
    csv = csv.split('\n');
    for (let csvEntity of csv) {
        let [name, phone, email] = csvEntity.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            csvNumber++;
        }
    }

    return csvNumber;
};
