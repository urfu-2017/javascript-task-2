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
 * @returns {boolean}
 */
exports.add = function (phone, name, email) {
    var phoneRe = new RegExp('^[0-9]{10}$');
    if (!phoneRe.test(phone) || typeof(name) === 'undefined' || phone in phoneBook) {
        return false;
    }
    phoneBook[phone] = { 'name': name, 'email': email };

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean}
 */
exports.update = function (phone, name, email) {
    if (typeof(phone) === 'undefined' || typeof(email) === 'undefined') {
        return false;
    } else if (typeof(name) === 'undefined') {
        phoneBook[phone]['email'] = email;
    } else {
        phoneBook[phone]['email'] = email;
        phoneBook[phone]['name'] = name;
    }

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Integer}
 */
exports.findAndRemove = function (query) {
    var count = 0;
    for (var phone in phoneBook) {
        if (query === '*' || phone.match(query) || phoneBook[phone]['email'].match(query) ||
        phoneBook[phone]['name'].match(query)) {
            delete phoneBook[phone];
            count++;
        }
    }

    return count;
};

function contactToString(phone) {
    var name = phoneBook[phone]['name'];
    var phone1 = phone.slice(0, 3);
    var phone2 = phone.slice(3, 6);
    var phone3 = phone.slice(6, 8);
    var phone4 = phone.slice(8);
    var email = phoneBook[phone]['email'];
    var res = name + ' 7 (' + phone1 + ' ) ' + phone2 + '-' + phone3 + '-' + phone4 + ' ' + email;

    return res;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String}
 */
exports.find = function (query) {
    var result = [];
    for (var phone in phoneBook) {
        if (typeof(query) === 'undefined' || query === '') {
            break;
        }
        if (query === '*' || phone.match(query) || phoneBook[phone]['email'].match(query) ||
        phoneBook[phone]['name'].match(query)) {
            result.push(contactToString(phone));
        }
    }
    var newRes = result.sort().join('\n');

    return newRes;
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

    var lines = csv.split('\n');
    var count = 0;
    for (var i in lines) {
        var record = lines[i].split(';');
        if (record[1] in phoneBook) {
            exports.update(record[1], record[0], record[2]);
        } else {
            exports.add(record[1], record[0], record[2]);
        }
        count++;
    }

    return count;
};
