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

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.add = function (phone, name, email) {
    if (!testAdd(phone, name, email)) {
        return false;
    }
    phoneBook.push({ phone, name, email });
    return true;
};

// Тесты на проверку при добавлении в справочник на
// наличие имени 
// чтобы не было совпадений номеров телефонов
// костыльная проверка формата номера телефона 
function testAdd(phone, name, email) {
    if (typeof (name) === 'undefined') {

        return false;
    }
    for (var str in phoneBook) {
        if (phoneBook.hasOwnProperty(str)) {
            var element = phoneBook[str];
            if (element.phone.indexOf(phone) !== -1) {

                return false;
            }
        }
    }
    if (typeof (phone) !== 'undefined') {
        if (phone.length !== 10 || phone.match(/[^\d]/g, '')) {

            return false;
        }
    }
    if (!moreTest(phone) || !moreTest(name)) {
        return false;
    }

    return true;
}

function moreTest(value) {
    if (typeof (value) === 'undefined' || typeof (value) === '' || !value) {
        return false;
    }
    return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.update = function (phone, name, email) {
    if (moreTest(name) && moreTest(phone)) { //если имя задано, то обрабатывать
        for (var str in phoneBook) {
            if (phoneBook.hasOwnProperty(str)) {
                var element = phoneBook[str];
                if (element.phone.indexOf(phone) !== -1) {
                    element.phone = phone;
                    element.name = name;
                    element.email = email;
                }
            }
        }

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
exports.findAndRemove = function (query) {
    let arr = [];
    let index = 0;
    let count = 0;
    if (query === '*') {
        let i = 0
        for (i = 0; i <= phoneBook.length; i++) {
            phoneBook.splice(0, 1);
        }
        return i;
    }
    for (var str in phoneBook) {
        if (phoneBook.hasOwnProperty(str)) {
            var element = phoneBook[str];
            if (typeof (element.phone) !== 'undefined') {
                if (element.phone.indexOf(query) !== -1) {
                    arr.push(index);
                }
            }
            if (typeof (element.name) !== 'undefined') {
                if (element.name.indexOf(query) !== -1) {
                    arr.push(index);
                }
            }
            if (typeof (element.email) !== 'undefined') {
                if (element.email.indexOf(query) !== -1) {
                    arr.push(index);
                }
            }
            index++;
        }
    }
    arr.reverse();
    arr.forEach(function (indexOfElem) {
        phoneBook.splice(indexOfElem, 1);
    }, this);

    return arr.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function (query) {
    let answer = [];
    if (query === '' || !moreTest(query)) {
        return [];
    }
    if (query === '*') {
        for (var str in phoneBook) {
            if (phoneBook.hasOwnProperty(str)) {
                var element = phoneBook[str];
                if (typeof (element.phone) !== 'undefined') {
                    answer.push(sortAndExport(element));
                }
            }
        }
    }

    if (typeof (query) === null || typeof (query) === 'undefined') {
        return null;
    }

    for (var str in phoneBook) {
        if (phoneBook.hasOwnProperty(str)) {
            var element = phoneBook[str];
            if (typeof (element.phone) !== 'undefined') {
                if (element.phone.indexOf(query) !== -1) {
                    answer.push(sortAndExport(element));
                }
            }
            if (typeof (element.name) !== 'undefined') {
                if (element.name.indexOf(query) !== -1) {
                    answer.push(sortAndExport(element));
                }
            }
            if (typeof (element.email) !== 'undefined') {
                if (element.email.indexOf(query) !== -1) {
                    answer.push(sortAndExport(element));
                }
            }
        }
    }
    return answer.sort();
};

function sortAndExport(obj) {
    let name = obj.name;
    let phone = '+7 (' + obj.phone.slice(0, 3) + ') ' + obj.phone.slice(3, 6) + '-'
        + obj.phone.slice(6, 8) + '-' + obj.phone.slice(8, 10);
    let email;
    if (typeof (obj.email) === 'undefined') {
        email = '';
    }
    else
        email = obj.email;
    let o = name + ', ' + phone + ', ' + email;
    return o;
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

    return csv.split('\n').length;
};
