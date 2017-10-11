'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook = {};

/**
 * приводит номер телефона к нужному формату
 * @param {String} phone
 * @returns {String}
 */
var formatPhone = function (phone) {
    return '+7 (' + phone.substr(0, 3) + ') ' + phone.substr(3, 3) +
       '-' + phone.substr(6, 2) + '-' + phone.substr(8, 2);
};

/**
 * Проверка удовлетворения строки str запросу request
 * @param {String} request
 * @param {String} str
 * @returns {Boolean}
 */
var like = function (request, str) {
    return String(str).toLowerCase()
        .indexOf(String(request).toLowerCase()) >= 0;
};

/**
 * Проверка удовлетворения строки str запросу request
 * @param {String} request
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
var satisfiesTheTrequest = function (request, phone, name, email) {
    return request === '*' || like(request, phone) || like(request, name) || like(request, email);
};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    name = name || '';
    if (name !== '' && /^[0-9]{10}$/.test(phone) && !phoneBook[phone]) {
        phoneBook[phone] = [name, email || ''];

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    name = name || '';
    phone = phone || '';
    if (phoneBook[phone] && name && /^[0-9]{10}$/.test(phone)) {
        phoneBook[phone] = [name, email || ''];

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    var k = 0;
    for (let key in phoneBook) {
        if (satisfiesTheTrequest(query, key, phoneBook[key][0], phoneBook[key][1])) {
            delete phoneBook[key];
            k++;
        }
    }

    return k;
};

function createString(phone, name, email) {
    var key = phone;
    var str = String(name) + ', ' + formatPhone(key);
    if (email !== '') {
        str += ', ' + email;
    }

    return str;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    var res = [];
    for (let key in phoneBook) {
        if (satisfiesTheTrequest(query, key, phoneBook[key][0], phoneBook[key][1])) {
            var str = createString(key, phoneBook[key][0], phoneBook[key][1]);
            res.push(str);
        }
    }

    return res.sort();
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
    var k = 0;
    var lines = csv.split('\n');
    for (let i = 0; i < lines.length; i += 1) {
        var line = lines[i].split(';');
        if (line.length !== 2 && line.length !== 3) {
            continue;
        }
        if (exports.add(line[1], line[0], line[2])) {
            k++;
            continue;
        }
        if (exports.update(line[1], line[0], line[2])) {
            k++;
        }
    }

    return k;
};
