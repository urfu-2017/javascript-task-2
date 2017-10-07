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
 */
exports.add = function (phone, name, email) {
    if (!/[0-9]{10}/.test(phone) && phone.length !== 10 || !name || !checkEmail(email) ) {
        return false;
    }
    phoneBook.push({phone,name});
    if (email) {
        phoneBook[length-1].email = email;
    }
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.update = function (phone, name, email) {
    let index = find(Object.values(phoneBook), phone);
    if (index === -1 || !name || (email && !checkEmail(email))) {
        return false;
    }
    phoneBook[index].name = name;
    if (email) {
        phoneBook[inde].email = email;
    } else {
        delete phoneBook[index].email;
    }
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
exports.findAndRemove = function (query) {
    let countDelete = 0;
    for (var i = phoneBook.length - 1; i >= 0 ; i--) {
        for (let value of phoneBook[i]) {
            if (value.indexOf(query) !== -1) {
                phoneBook.splice(i, 1);
                countDelet++;
                break;
            }
        }
    }
    return countDelete;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function (query) {
    let resuslt = [];
    for (let person of phoneBook) {
        result.push('');
        for (let value of Object.values(person)) {
            if (value.indexOf(query) !== -1) {
                result.push(person.name + ', +7 (' + person.phone.slice(0, 3) + ') ' +
                person.phone.slice(3, 6) + '-' + person.phone.slice(6, 8) + '-' +
                person.phone.slice(8));
                if (person.email) {
                    result[result.length - 1] += ', ' + person.email;
                }
                break;
            }
        }
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
    let arrUsers = csv. split('\n');
    for (let user of arrUsers) {
        let userSplit = user.split(';');
        if(find(userSplit[1])) {
            update(userSplit[1], userSplit[0], userSplit[2]);
            countUpdates++;
        } else {
            add(userSplit[1], userSplit[0], userSplit[2])
        }
    }
    return countUpdates;
};

function checkEmail(query) {
    return /[a-z0-9-]+@[a-z0-9-]+\.[a-z0-9-]/i.test(query);
}