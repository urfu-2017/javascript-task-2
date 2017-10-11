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


function sameCheck(phone) {
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {

            return true;
        }
    }

    return false;
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */

exports.add = function (phone, name, email) {
    let newUser = { phone: phone, name: name, email: email };
    if (typeof newUser.email !== 'string') {
        newUser.email = undefined;
    }
    if (correctCheck(newUser)) {
        phoneBook.push(newUser);
    }

    return true;
};

function correctCheck(newUser) {
    if (newUser.phone.length !== 10 || typeof newUser.name !== 'string' ||
    newUser.name.length === 0 || !/^\d{10}$/.test(newUser.phone)) {

        return false;
    }
    if (sameCheck(newUser.phone)) {

        return false;
    }

    return true;
}

function findUser(phone) {
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {

            return i;
        }
    }

    return 'error';
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */

exports.update = function (phone, name, email) {
    let updateUser = { phone: phone, name: name, email: email };
    let userPos = findUser(updateUser.phone);
    if (userPos !== 'error') {
        if (typeof name === 'string') {
            phoneBook[userPos].name = name;
        }
        if (typeof email === 'string') {
            phoneBook[userPos].email = email;
        } else {
            phoneBook[userPos].email = undefined;
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
    let users = unique(findAll(query));
    let i = 0;
    for (; i <= users.length; i++) {
        phoneBook.splice(users[i], 1);
    }

    return i - 1;
};

function mailCheck(i, str) {
    if (phoneBook[i].email !== undefined) {
        if (phoneBook[i].email.indexOf(str) !== -1) {

            return true;
        }
    }

    return false;
}


function findAll(str) {
    let answer = [];
    if (str === undefined) {
        return ['nothing'];
    }

    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone.indexOf(str) !== -1) {
            answer.push(i);
        }
        if (phoneBook[i].name.indexOf(str) !== -1) {
            answer.push(i);
        }
        if (mailCheck(i, str)) {
            answer.push(i);
        }
    }

    return answer;
}
function unique(arr) {
    var obj = {};

    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true;
    }

    return Object.keys(obj);
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

exports.find = function (query) {
    let answer = [];
    let strAnswer = [];

    if (query !== '*') {
        let users = unique(findAll(query));
        for (let i = 0; i < users.length; i++) {
            answer.push(phoneBook[users[i]]);
        }
    } else {
        for (let i = 0; i < phoneBook.length; i++) {
            answer.push(phoneBook[i]);
        }
    }
    answer.sort(sortParams);
    strAnswer = transformation(answer);
    if (strAnswer.length !== 0) {
        delete strAnswer[strAnswer.length - 1];

        return strAnswer.join('').split('ж');
    }

    return [];
};

function sortParams(nameA, nameB) {
    if (nameA.name[0] > nameB.name[0]) {
        return 1;
    }

    return 0;
}

function transformation(answer) {
    let strAnswer = [];
    for (let i = 0; i < answer.length; i++) {
        strAnswer.push(answer[i].name + ', +7 (' + answer[i].phone.substring(0, 3) + ') ' +
        answer[i].phone.substring(3, 6) + '-' +
        answer[i].phone.substring(6, 8) + '-' + answer[i].phone.substring(8, 10));
        if (answer[i].email !== undefined) {
            strAnswer.push(', ' + answer[i].email);
        }
        strAnswer.push('ж');
    }

    return strAnswer;
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
    let users = csv.split('\n');
    let counter = 0;
    for (let i = 0; i < users.length; i++) {
        let user = users[i].split(';');
        if (exports.add(user[1], user[0], user[2]) ||
         exports.update(user[1], user[0], user[2])) {
            counter++;
        }
    }

    return counter;
};
