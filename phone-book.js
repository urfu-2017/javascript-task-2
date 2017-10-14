'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = [];
let phoneB = /[0-9]{10}/;

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

function repeatPhone(phone) {
    let i = 0;
    let answer = true;
    while (phoneBook[i] !== undefined && answer) {
        if (phoneBook[i][1] === phone) {
            answer = false;
        }
        i ++;
    }

    return answer;
}
function npe(phone, name, email) {
    let a = [];
    if (email !== undefined) {
        a = [name, phone, email];
    } else {
        a = [name, phone];
    }

    return a;
}

exports.add = function (phone, name, email) {
    let answer = false;
    if (repeatPhone(phone) && phoneB.test(phone) && phone.length === 10 && name !== undefined) {
        answer = true;
        phoneBook.push(npe(phone, name, email));
    }

    return answer;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.update = function (phone, name, email) {

    let i = 0;
    let result = true;
    let a = [];
    if (name === undefined) {
        return false;
    }
    while (phoneBook[i] !== undefined && result) {
        if (phoneBook[i][1] === phone) {
            phoneBook.splice(i, 1);
            a = npe(phone, name, email);
            phoneBook.push(a);
            result = false;
        }
        i++;
    }

    return !result;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

function exist(i, query) {
    let a;
    if (phoneBook[i][2] !== undefined) {
        a = phoneBook[i][0].indexOf(query) !== -1 || phoneBook[i][1].indexOf(query) !== -1 ||
            phoneBook[i][2].indexOf(query);
    } else {
        a = phoneBook[i][0].indexOf(query) !== -1 || phoneBook[i][1].indexOf(query) !== -1;
    }

    return a;
}


exports.findAndRemove = function (query) {
    if (query === '') {
        return 0;
    }
    if (query === '*') {
        phoneBook = [];

        return phoneBook.length;
    }
    let a = [];
    let i = 0;
    while (phoneBook[i] !== undefined) {
        if (exist(i, query)) {
            a.push(i);
        }
        i ++;
    }
    for (i = a.length - 1; i >= 0; i--) {
        phoneBook.splice(i, 1);
    }

    return a.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

function creatCon(contact, query) {
    let answer = '';
    if (contact[0].indexOf(query) !== -1 || contact[1].indexOf(query) !== -1 ||
        contact[2].indexOf(query) !== -1) {
        if (contact[2] !== undefined) {
            answer = contact[0] + ', +7 (' + contact[1].slice(0, 3) + ') ' +
                contact[1].slice(3, 6) + '-' + contact[1].slice(6, 8) + '-' +
                contact[1].slice(8) + ', ' + contact[2];
        } else {
            answer = contact[0] + ', +7 (' + contact[1].slice(0, 3) + ') ' +
                contact[1].slice(3, 6) + '-' + contact[1].slice(6, 8) + '-' +
                contact[1].slice(8);
        }
    }

    return answer;
}

function conl(query) {
    let i = 0;
    let a = [];
    let result = '';
    while (phoneBook[i] !== undefined) {
        result = creatCon(phoneBook[i], query);
        if (result !== '') {
            a.push(result);
        }
        i++;
    }

    return a.sort();
}

exports.find = function (query) {
    let result = true;
    if (query === '' || query.indexOf(',') !== -1) {
        result = false;
    }
    if (query === '*') {
        result = false;

        return conl('');
    }
    if (result) {

        return conl(query);
    }
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */

function addAndUpdate(name, phone, email) {
    let j = 0;
    let answer = true;
    while (phoneBook[j] !== undefined && answer) {
        if (phoneBook[j].split(',')[1] === phone) {
            answer = false;
            phoneBook.splice(j, 1);
        }
        j ++;
    }

    phoneBook.push(npe(phone, name, email));
}

exports.importFromCsv = function (csv) {
    let i = 0;
    let a = csv.split('\n');
    while (a[i] !== undefined) {
        let mas = a.slice(';');
        if (mas[1].length === 10 && phoneB.test(mas[1]) && mas[0].length !== 0) {
            addAndUpdate(mas[0], mas[1], mas[2]);
        }
        i++;
    }
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует

    return a.length - 1;

};
