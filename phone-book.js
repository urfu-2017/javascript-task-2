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

    if (email === undefined) {
        email = ' ';
    }
    if (checkPhone(phone) || checkName(name) || checkEm(email)) {
        return false;
    }

    if (checkData(phone, name, email)) {
        phoneBook.push({ name: name, phone: phone, email: email });

        return true;
    }

    return false;

};

function checkName(name) {

    if (name === undefined || name === null || name === '' || typeof(name) !== 'string') {
        return true;
    }

    return false;
}

function checkPhone(phone) {

    if (phone === undefined || phone === null || phone === '' ||
     typeof(phone) !== 'string' || /\^d{10}$/.test(phone)) {
        return true;
    }

    return false;
}

function checkEm(email) {

    if (email === null || email === '' || typeof(email) !== 'string') {
        return true;
    }

    return false;
}

function checkData(phone, name, email) {
    var check = true;

    for (var i = 0; i < phoneBook.length; i++) {
        var nameInBook = phoneBook[i].name;
        var phoneInBook = String(phoneBook[i].phone);
        var emailInBook = phoneBook[i].email;
        if (nameInBook.indexOf(name) >= 0 || phoneInBook.indexOf(String(phone)) >= 0 ||
        emailInBook.indexOf(email) >= 0) {
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
    if (email === undefined) {
        email = ' ';
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (String(phoneBook[i].phone).indexOf(String(phone)) >= 0 && name !== undefined) {

            phoneBook[i].name = name;
            phoneBook[i].phone = phone;
            phoneBook[i].email = email;

            return true;
        } else if (String(phoneBook[i].phone).indexOf(String(phone)) >= 0 && name === undefined) {
            phoneBook[i].phone = phone;
            phoneBook[i].email = email;
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
        var emailInBook = phoneBook[i].email;
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
    if (name.indexOf(query) >= 0 || phone.indexOf(query) >= 0 ||
    email.indexOf(query) >= 0) {

        return true;
    }

    return false;
}

function checkEmail(email) {
    if (email === ' ') {
        email = '';
    } else {
        email = ', ' + email;
    }

    return email;
}

function checkQ(query) {
    if (query === '' || query === undefined || query === null) {
        return true;
    }

    return false;
}

function normalize(phone) {

    phone = '+7 (555) ' + String(phone).slice(3, 6) + '-' +
     String(phone).slice(6, 8) + '-' + String(phone).slice(8);

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
