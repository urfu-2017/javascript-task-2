'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

/**
 * Телефонная книга
 */
var phoneBook = [];

exports.add = function (phone, name, email) {

    if (checkPhone(phone) || checkName(name) || checkEm(email)) {
        return false;
    }

    if (checkData(phone)) {
        phoneBook.push({ name: name, phone: phone, email: email });

        return true;
    }

    return false;

};

function checkName(name) {

    if (name !== undefined && name !== null && name.trim() !== '' && typeof(name) === 'string') {
        return false;
    }

    return true;
}

function checkPhone(phone) {

    if (phone !== undefined && phone !== null && phone.trim() !== '' &&
     typeof(phone) === 'string' && /^\d{10}$/.test(phone)) {
        return false;
    }

    return true;
}

function checkEm(email) {
    if (email === undefined) {
        return false;
    }
    if (typeof(email) === 'string') {
        return false;
    }

    return true;
}

function checkData(phone) {
    var check = true;

    for (var i = 0; i < phoneBook.length; i++) {
        var phoneInBook = String(phoneBook[i].phone);
        if (phoneInBook.indexOf(String(phone)) >= 0) {

            check = false;
            break;
        }
    }

    return check;

}


/*
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
*/
exports.update = function (phone, name, email) {

    if (checkPhone(phone) || checkName(name) || checkEm(email)) {
        return false;
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (String(phoneBook[i].phone).indexOf(String(phone)) >= 0) {

            phoneBook[i].name = name;
            phoneBook[i].email = email;

            return true;
        }
    }

    return false;

};

exports.findAndRemove = function (query) {
    var count = 0;
    if (checkQ(query)) {
        return count;
    }
    if (query === '*') {
        query = '';
    }
    for (var i = 0; i < phoneBook.length; i++) {
        var nameInBook = phoneBook[i].name;
        var phoneInBook = String(phoneBook[i].phone);
        var emailInBook = String(phoneBook[i].email);
        if (ckeckOnExistance(nameInBook, phoneInBook, emailInBook, query)) {
            phoneBook.splice(i, 1);
            i--;
            count++;
        }
    }

    return count;

};

exports.find = function (query) {
    var result = [];
    if (checkQ(query)) {
        return result;
    }
    if (query === '*') {
        query = '';
    }
    for (var i = 0; i < phoneBook.length; i++) {
        var nameInBook = phoneBook[i].name;
        var phoneInBook = String(phoneBook[i].phone);
        var emailInBook = phoneBook[i].email;
        if (ckeckOnExistance(nameInBook, phoneInBook, emailInBook, query)) {
            result.push(nameInBook + ', ' + normalize(phoneInBook) +
             checkEmail(emailInBook));
        }
    }

    return result.sort();
};

function ckeckOnExistance(name, phone, email, query) {
    if (name.indexOf(String(query)) >= 0 || phone.indexOf(String(query)) >= 0 ||
    email.indexOf(String(query)) >= 0) {

        return true;
    }

    return false;
}

function checkEmail(email) {
    if (email === undefined) {
        email = '';
    } else {
        email = ', ' + email;
    }

    return email;
}

function checkQ(query) {
    if (query === '') {
        return true;
    }

    return false;
}

function normalize(phone) {

    phone = '+7 (' + String(phone).slice(0, 3) + ') ' + String(phone).slice(3, 6) + '-' +
     String(phone).slice(6, 8) + '-' + String(phone).slice(8, 10);

    return phone;
}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
exports.importFromCsv = function (csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует
    return csv.split('\n').length;
};
*/
