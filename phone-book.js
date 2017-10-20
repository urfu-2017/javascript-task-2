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
let phoneB = /^[0-9]{10}$/;

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

function repeatPhone(phone) {
    let i = 0;
    while (phoneBook[i]) {
        if (phoneBook[i].split(',')[1] === phone) {
            return false;
        }
        i ++;
    }

    return true;
}
function npe(phone, name, email) {
    let a = '';
    if (email) {
        a = name + ',' + phone + ',' + email;
    } else {
        a = name + ',' + phone;
    }

    return a;
}

exports.add = function (phone, name, email) {
    let answer = false;
    if (repeatPhone(phone) && phoneB.test(phone) && name) {
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
    if (!name || !phoneB.test(phone)) {
        return false;
    }
    while (phoneBook[i]) {
        if (phoneBook[i].split(',')[1] === phone) {
            phoneBook.splice(i, 1);
            phoneBook.push(npe(phone, name, email));

            return true;
        }
        i++;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

exports.findAndRemove = function (query) {
    let leng = phoneBook.length;
    if (!query) {
        return 0;
    }
    if (query === '*') {
        phoneBook = [];

        return leng;
    }
    let a = phoneBook.filter(ent => ent.indexOf(query) === -1);
    phoneBook = a;

    return leng - a.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

function creatCon(contact) {
    let answer = '';
    let tempStr = contact.split(',');
    if (tempStr[2]) {
        answer = tempStr[0] + ', +7 (' + tempStr[1].slice(0, 3) + ') ' +
            tempStr[1].slice(3, 6) + '-' + tempStr[1].slice(6, 8) + '-' +
            tempStr[1].slice(8) + ', ' + tempStr[2];
    } else {
        answer = tempStr[0] + ', +7 (' + tempStr[1].slice(0, 3) + ') ' +
            tempStr[1].slice(3, 6) + '-' + tempStr[1].slice(6, 8) + '-' +
            tempStr[1].slice(8);
    }

    return answer;
}


exports.find = function (query) {
    let result = true;
    if (!query) {
        result = [];
    }
    if (query === '*') {
        return phoneBook.map(ent => creatCon(ent)).sort();
    }
    if (result) {

        return phoneBook.filter(ent => ent.indexOf(query) !== -1).map(ent => creatCon(ent))
            .sort();
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
    while (phoneBook[j] && answer) {
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
    let k = 0;
    let a = csv.split('\n');
    while (a[i]) {
        let mas = a[i].split(';');
        if (phoneB.test(mas[1]) && mas[0]) {
            addAndUpdate(mas[0], mas[1], mas[2]);
            k ++;
        }
        i++;
    }


    return k;

};

