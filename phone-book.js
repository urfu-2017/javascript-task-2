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
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    var validPhone = /\d{10}/;
    var validEmail = /.*@.*/;
    phone = String(phone);
    var isValid = (phone.length === 10) && Boolean(name) && validPhone.test(phone);
    isValid = isValid && phoneBook.every(elem => elem.phone !== phone);
    isValid = isValid && (validEmail.test(email) || !(email));
    if (!isValid) {
        return false;
    }
    email = email ? email : '';
    phoneBook.push({ phone: phone, name: name, email: email });

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Bollean}
 */
exports.update = function (phone, name, email) {
    phone = String(phone);
    var validEmail = /.*@.*/;
    var index = phoneBook.findIndex(elem => elem.phone === phone);
    if ((index === -1) || !(name) || !(validEmail.test(email) || !(email))) {
        return false;
    }
    phoneBook[index].name = name;
    phoneBook[index].email = email ? email : '';

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Integer}
 */
exports.findAndRemove = function (query) {
    if (!(query)) {
        return 0;
    }
    var oldLength = phoneBook.length;
    var result = phoneBook.filter(function (elem) {
        var isFind = (query === '*') || (elem.phone.indexOf(query) + 1);
        isFind = isFind || (elem.name.indexOf(query) + 1);
        isFind = isFind || (String(elem.email).indexOf(query) + 1);

        return !isFind;
    });
    phoneBook = result;

    return oldLength - phoneBook.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    var result = [];
    if (!(query)) {
        return [];
    }
    result = phoneBook.map(function (elem) {
        var isFind = (query === '*') || (elem.phone.indexOf(query) + 1);
        isFind = isFind || (elem.name.indexOf(query) + 1) || (elem.email.indexOf(query) + 1);
        if (isFind) {
            return correctNote(elem.name, elem.phone, elem.email);
        }

        return '';
    }, this);

    return result.sort();
};


function correctNote(name, phone, email) {
    var correctPhone = '+7 (' + phone.slice(0, 3) + ') ' + phone.slice(3, 6);
    correctPhone += '-' + phone.slice(6, 8) + '-' + phone.slice(8, 10);
    var result = name + ', ' + correctPhone;
    result = email ? result + ', ' + email : result;

    return result;
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
    var notes = csv.split('\n');
    var validPhone = /\d{10}/;
    var count = 0;
    notes.forEach(function (element) {
        var [name, phone, email] = element.split(';');
        var isValid = phone.length === 10 && validPhone.test(phone) && (name);
        if (isValid) {
            var index = phoneBook.findIndex(elem => elem.phone === phone);
            count++;
            if ((index + 1)) {
                phoneBook[index].name = name;
                phoneBook[index].email = email ? email : '';
            } else {
                email = email ? email : '';
                phoneBook.push({ phone: phone, name: name, email: email });
            }
        }
    }, this);

    return count;
};
