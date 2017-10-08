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

/*
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.add = function (phone, name, email) {
    var regexp = /[^0-9]/;
    if (regexp.test(phone) || phone.length !== 10 || !name) {

        return false;
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            return false;
        }
    }
    var person = {
        phone: phone,
        name: name,
        email: email
    };
    phoneBook.push(person);

    return true;
};

/*
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.update = function (phone, name, email) {
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone && helpUpdate(phoneBook[i], phone, name, email)) {

            return true;
        }
    }

    return false;
};

function helpUpdate(person, phone, name, email) {
    if (name) {
        person.email = email;
        person.name = name;

        return true;
    }

    return false;

}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

exports.findAndRemove = function (query) {

    var k = 0;
    for (var i = phoneBook.length - 1; i >= 0; i--) {
        if (helpFind(phoneBook[i], query)) {
            phoneBook.splice(i, 1);
            k++;
        }
    }

    return k;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]} 
 */
exports.find = function (query) {
    var answer = [];
    if (query === '*') {
        for (var j = 0; j < phoneBook.length; j++) {
            answer.push(findmail(phoneBook[j]));
        }
        answer.sort();

        return answer;
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (helpFind(phoneBook[i], query)) {
            answer.push(findmail(phoneBook[i]));
        }
    }
    answer.sort();

    return answer;
};

function findmail(person) {
    if (person.email !== undefined && person.email !== '') {
        return (person.name + ', ' + toPhone(person.phone) +
        ', ' + person.email);
    }

    return (person.name + ', ' + toPhone(person.phone));
}

function helpFind(person, query) {
    person.email = person.email || '';
    if (person.phone.indexOf(query, 0) === -1 && person.name.indexOf(query, 0) === -1 &&
        person.email.indexOf(query, 0) === -1) {
        return false;
    }

    return true;
}

function toPhone(number) {
    var numb = '+7 (' + number.substr(0, 3) + ') ' +
     number.substr(3, 3) + '-' + number.substr(6, 2) + '-' + number.substr(8, 2);

    return (numb);
}

/*
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    var AaU = 0;
    var splitcsv = csv.split('\n');
    for (var p = 0; p < splitcsv.length; p++) {
        var pers = toPhoneBook(splitcsv[p]);
        if (exports.add(pers.phone, pers.name, pers.emal) !== false ||
        exports.update(pers.phone, pers.name, pers.emal === true)) {
            helptoPhoneBook(pers);
            AaU++;
        }
    }

    return AaU;

};

function helptoPhoneBook(pershelp) {
    if (exports.find(pershelp.phone) !== []) {
        exports.update(pershelp.phone, pershelp.name, pershelp.email);
    } else {
        exports.add(pershelp.phone, pershelp.name, pershelp.email);
    }

    return true;
}

function toPhoneBook(str) {
    var tophb = str.split(';');
    var Exeleperson = {
        name: tophb[0],
        phone: tophb[1],
        email: tophb[2]
    };

    return Exeleperson;

}
