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


function isPhoneCorrect(phone) {
    var check = /^\d{10}$/;
    if (check.test(phone) === true) {
        return true;
    }

    return false;
}

function isNameCorrect(name) {
    if (name !== '' && name !== null && name !== undefined) {
        return true;
    }

    return false;
}

function phoneFormat(phone) {
    var correctPhone = '+7 (' + phone.slice (0, 3) + ') ' + phone.slice (3, 6) + '-' +
phone.slice (6, 8) + '-' + phone.slice (8, 10);

    return correctPhone;
}

function searchQuery(query1) {
    var foundArray = [];
    for (var person1 of phoneBook) {
        var name1 = person1.name.indexOf(query1);
        var phone1 = person1.phone.indexOf(query1);
        var email1 = person1.email.indexOf(query1);
        if (name1 !== -1 || phone1 !== -1 || email1 !== -1) {
            foundArray.push (person1.name + ', ' + phoneFormat(person1.phone) +
             ', ' + person1.email);
        }
        foundArray.sort();

        return foundArray;
    }
}

function searchAll() {
    var foundArray1 = [];
    for (var person2 of phoneBook) {
        foundArray1.push (person2.name + ', ' + phoneFormat(person2.phone) +
         ', ' + person2.email);
        foundArray1.sort();
    }

    return foundArray1;
}

function emailCheck(email) {
    var email4;
    if (email === '' || email === undefined || email === null) {
        email4 = '';
    }

    return email4;
}


/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} 
 */

// Телефоны принимаются только в формате 5556667788 (без кода) 
// Не добавляет уже существующую запись
// Не добавляет запись без имени
exports.add = function (phone, name, email) {
    if (isPhoneCorrect(phone) === false || isNameCorrect(name) === false) {

        return false;
    }

    for (var person2 of phoneBook) {
        if (person2.phone === phone) {

            return false;
        }
    }

    var person = {
        phone,
        name,
        email
    };
    var email2 = emailCheck (email);

    person.phone = phone;
    person.name = name;
    person.email = email2;
    phoneBook.push(person);

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */

// Обновляет «Имя» и «Электронную почту» по заданному «Телефону»
// «Электронную почту» можно стереть (не передав последний параметр), а «Имя» – нет
exports.update = function (phone, name, email) {
    if (isPhoneCorrect(phone) === false || isNameCorrect(name) === false) {

        return false;
    }
    for (var person3 of phoneBook) {
        if (person3.phone === phone) {
            person3.name = name;
            var email3 = emailCheck (email);
            person3.email = email3;
        }

        return true;
    }

    return false;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */

// На вход принимает запрос в виде строки
// Ищет вхождение этой строки хотя бы в одно из полей 
// Возвращает отсортированный по «Имени» массив строк в формате name, phone, email
// «Имя» и «Электронную почту» выводит как есть, а «Телефон» в формате +7 (555) 666-77-88
// Пустой запрос не должен ничего находить
// Запрос «*» находит все записи
exports.find = function (query) {
    var newArray = [];
    if (typeof query !== 'string' || query === '' || query === null || query === undefined) {
        return false;
    }
    if (query === '*') {
        newArray = searchAll();
    } else {
        newArray = searchQuery(query);
    }

    return newArray;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */

// На вход принимает запрос в виде строки
// Находит (смотри find) и удаляет все найденные записи
// Возвращает число удаленных записей

exports.findAndRemove = function (query) {
    if (typeof query !== 'string' || query === '') {

        return false;
    }
};

