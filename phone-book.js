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
function incorrectNameAndPhone(name, phone) {
    if (typeof name === 'undefined' || !(/^[0-9]{10}$/.test(phone))) {
        return true;
    }

    return false;
}

/**
 * Поиск записи по шаблону
 * @param {RegExp} query
 * @param {Object} entry
 * @returns {String} - Найденная по шаблону запись в подходящем формате
 */
function findQueryInEntry(query, entry) {
    let resultString;
    for (let value of Object.values(entry)) {
        if (query.test(value)) {
            resultString = `${entry.name}, +7 (${entry.phone.slice(0, 3)}) ${entry.phone.slice(3, 6)}-${entry.phone.slice(6, 8)}-${entry.phone.slice(8)}, ${entry.email}`; // eslint-disable-line max-len
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
    if (incorrectNameAndPhone(name, phone)) {
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
    if (incorrectNameAndPhone(name, phone)) {
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
    switch (query) {
        case '':
            return [];
        case '*':
            query = /.*/g;
            break;
        default:
            query = new RegExp(query);
            break;
    }
    for (let i = phoneBook.length - 1; i > -1; i--) {
        let str = findQueryInEntry(query, phoneBook[i]);
        if (typeof str !== 'undefined') {
            phoneBook.splice(phoneBook.indexOf(phoneBook[i]), 1);
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
    switch (query) {
        case '':
            return [];
        case '*':
            query = /.*/g;
            break;
        default:
            query = new RegExp(query);
            break;
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
        if (exports.add(phone, name, email)) {
            csvNumber++;
        } else if (exports.update(phone, name, email)) {
            csvNumber++;
        }
    }

    return csvNumber;
};
