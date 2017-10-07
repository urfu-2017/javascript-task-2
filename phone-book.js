'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook;

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean}
 */
exports.add = function (phone, name, email) {
    if (!/[0-9]{10}/.test(phone) && phone.length !== 10 || !name || !checkEmail(email)) {
        return false;
    }
    phoneBook.push({ phone, name });
    if (email) {
        phoneBook[phoneBook.length - 1].email = email;
    }
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean}
 */
exports.update = function (phone, name, email) {
    let index = Object.values(phoneBook).indexOf(phone);
    if (index === -1 || !name || (email && !checkEmail(email))) {
        return false;
    }
    phoneBook[index].name = name;
    if (email) {
        phoneBook[index].email = email;
    } else {
        delete phoneBook[index].email;
    }
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    let countDelete = 0;
    for (var i = phoneBook.length - 1; i >= 0; i--) {
        countDelte += deleteUser(query, phoneBook[i], i);
    }

    return countDelete;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    let result = [];
    for (let person of phoneBook) {
        checkUser(person);
    }

    return result;
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
    let countUpdates = 0;
    let arrUsers = csv.split('\n');
    for (let user of arrUsers) {
        let userSplit = user.split(';');
        if (exports.find(userSplit[1])) {
            exports.update(userSplit[1], userSplit[0], userSplit[2]);
            countUpdates++;
        } else {
            exports.add(userSplit[1], userSplit[0], userSplit[2]);
        }
    }

    return countUpdates;
};

function checkEmail(query) {
    return /[a-z0-9-]+@[a-z0-9-]+\.[a-z0-9-]/i.test(query);
}

function checkUser(query) {
    for (let value of Object.values(query)) {
        if (value.indexOf(query) !== -1) {
            result.push(person.name + ', +7 (' + person.phone.slice(0, 3) + ') ' +
            person.phone.slice(3, 6) + '-' + person.phone.slice(6, 8) + '-' +
            person.phone.slice(8) + (person.email ? ', ' + person.email : ''));

            return;
        }
    }
}

function deleteUser(query, person, index) {
    for (let value of person) {
        if (value.indexOf(query) !== -1) {
            phoneBook.splice(index, 1);
            
            return 1;
        }
    }
    
    return 0;
}