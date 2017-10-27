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

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

/* phoneBook.add('5554440044', 'Григорий', 'grisha@example.com');
phoneBook.add('5552220022', 'Борис', 'boris@example.com');
phoneBook.add('5551110011', 'Алекс');
phoneBook.add('5553330033', 'Валерий', 'valera@example.com'); */

function checkData(phone, name) {
    if (phone !== undefined && (phone.match(/^\d{10}$/)) &&
        name !== undefined && !name.match(/@/)) {
        // &&(email === undefined || 
        // email.match(/^[\w.-_]+@[\w.-_]+\.\w{2,4}$/i)) name.match(/^[а-яA-Z]+$/i)
        return true;
    }

    return false;
}

function checkTwin(phone, pBook) {
    let length = pBook.length;
    var boolOne = true;
    var boolTwo = true;
    for (let i = 0; i < length; i++) {
        if (pBook[i].phone === phone) {
            boolOne = false;
        }

        boolTwo = true;
    }

    return boolOne && boolTwo;
}

exports.add = function (phone, name, email) {
    // console.log(phone.length);
    if (checkData(phone, name, email) && checkTwin(phone, phoneBook)) {
        phoneBook.push({ phone, name, email });

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

function updateSupport(i, name, email) {
    if (name !== null && name !== undefined && name.length > 0) {
        phoneBook[i].name = name;
        phoneBook[i].email = email;

        return true;
    }

    return false;
}

exports.update = function (phone, name, email) {
    var state = false;
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            state = updateSupport(i, name, email);
        }
    }

    return state;
};


/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

exports.findAndRemove = function (query) {
    var countSplice = 0;
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone.indexOf(query) !== -1 ||
        phoneBook[i].name.indexOf(query) !== -1 || (phoneBook[i].email &&
        phoneBook[i].email.indexOf(query) !== -1)) {
            countSplice++;
            phoneBook.splice(i, 1);
            i --;
        }
    }

    return countSplice;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

function sortData(i) {
    var listOfData = '';
    var newPhone = '';
    if (phoneBook[i].email !== undefined) {
        newPhone = '+7 (' + phoneBook[i].phone.slice(0, 3) + ') ' + phoneBook[i].phone.slice(3, 6) +
        '-' + phoneBook[i].phone.slice(6, 8) + '-' + phoneBook[i].phone.slice(8, 10);
        listOfData += phoneBook[i].name + ', ' + newPhone + ', ' + phoneBook[i].email;
    } else {
        newPhone = '+7 (' + phoneBook[i].phone.slice(0, 3) + ') ' + phoneBook[i].phone.slice(3, 6) +
        '-' + phoneBook[i].phone.slice(6, 8) + '-' + phoneBook[i].phone.slice(8, 10);
        listOfData += phoneBook[i].name + ', ' + newPhone;
    }

    return listOfData;
}
function findHelp(query) {
    var endData = [];
    for (let i = 0; i < phoneBook.length; i++) {
        if (query === '*') {
            endData.push(sortData(i));
        }
        if (phoneBook[i].phone.indexOf(query) !== -1 ||
        phoneBook[i].name.indexOf(query) !== -1) {
            endData.push(sortData(i));
        }
    }

    return endData.sort();
}
exports.find = function (query) {
    if (query !== '' && query !== undefined) {

        return findHelp(query);
    }

    return [];
};
// console.log(phoneBook);
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

    return csv.split('\n').length;
};
