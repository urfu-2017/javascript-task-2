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
var isFormAccount = {
    phone: undefined,
    name: undefined,
    email: undefined
};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {

    return firstCheck(phone, name, email, 'add');
};

function firstCheck(phone, name, email, flag) {
    name = checkNull(name);
    phone = checkData(phone);
    email = checkNull(email);
    if (phone === '') {
        return false;
    }
    if (name === '') {
        return false;
    }

    return addOrUpdate(phone, name, email, flag);
}

function addOrUpdate(phone, name, email, flag) {
    var number = findAccount(phone);
    switch(flag) {
        case 'add':
            if (number !== -1) {
                return false;
            }
            addAccount(phone, name, email);
            return true;
        break;
        case 'update':
            if (number === -1) {
                return false;
            }
            updateAccount(phone, name, email, number);
            return true;
        break;
        case 'csv':
            if (number === -1) {
                addAccount(phone, name, email);
            } else {
                updateAccount(phone, name, email, number);
            }
            return true;
        break;
    }

    return false;
}

function addAccount(phone, name, email) {
    var newAccount = Object.create(isFormAccount);
    newAccount.phone = phone;
    newAccount.name = name;
    newAccount.email = email;
    phoneBook.push(newAccount);
}

function updateAccount(phone, name, email, number) {
    var exemp = phoneBook[number];
    exemp.phone = phone;
    exemp.name = name;
    exemp.email = email;
}

function checkData(phone) {
    phone = checkNull(phone);
    if (!formPhone(phone)) {
        return '';
    }

    return phone;
}

function findAccount(phone) {
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            return i;
        }
    }

    return -1;
}

function formPhone(phone) {
    var reg = /^\d{10}$/;

    return reg.test(phone);
}

function checkNull(str) {
    if (typeof str !== 'string') {
        return '';
    }
    if (str.trim().length === 0) {
        return '';
    }

    return str;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {

    return firstCheck(phone, name, email, 'update');
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    var kol = 0;
    if (query === '*') {
        kol = phoneBook.length;
        phoneBook.splice(0, kol);

        return kol;
    }
    if (checkNull(query) === '') {
        return 0;
    }
    var t = findAllAccount(query, 'del');

    return t;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Object}
 */
exports.find = function (query) {
    var masOutputAccount = [];
    if (query === '*') {
        for (var i = 0; i < phoneBook.length; i++) {
            masOutputAccount.push(output(i));
        }
        masOutputAccount.sort();

        return masOutputAccount;
    }
    if (checkNull(query) === '') {
        return masOutputAccount;
    }

    return findAllAccount(query, '');
};

function findAllAccount(query, flag) {
    var masOutputAccount = [];
    var kol = 0;
    if (flag === '') {
        masOutputAccount = findElem(query, flag);
        masOutputAccount.sort();

        return masOutputAccount;
    }
    kol = findElem(query, flag);

    return kol;
}

function findQueryInAccounts(query, element) {
    query = query.toLowerCase();
    var keys = Object.keys(element);
    for (var i = 0; i < keys.length; i++) {
        if (element[keys[i]].toLowerCase().indexOf(query) !== -1) {
            return true;
        }
    }

    return false;
}

function findElem(query, flag) {
    var masFindElem = [];
    var kol = 0;
    for (var i = 0; i < phoneBook.length; i++) {
        if (findQueryInAccounts(query, phoneBook[i])) {
            kol++;
            i = findOrDeletAccount(i, masFindElem, flag);
        }
    }
    if (flag === 'del') {
        return kol;
    }

    return masFindElem;
}

function findOrDeletAccount(i, masFindElem, flag) {
    if (flag === '') {
        masFindElem.push(output(i));
    } else {
        phoneBook.splice(i, 1);
        i--;
    }

    return i;
}

function output(i) {
    var strOutput = '';
    var kod = phoneBook[i].phone.slice(0, 3);
    var p1 = phoneBook[i].phone.slice(3, 6);
    var p2 = phoneBook[i].phone.slice(6, 8);
    var p3 = phoneBook[i].phone.slice(8, 10);
    var phone = ', +7 (' + kod + ') ' + p1 + '-' + p2 + '-' + p3;
    strOutput = phoneBook[i].name + phone;
    if (phoneBook[i].email !== '') {
        strOutput += ', ' + phoneBook[i].email;
    }

    return strOutput;
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
    var csvData = csv.split('\n');
    var count = 0;
    for (var i = 0; i < csvData.length; i++) {
        var splitStr = csvData[i].split(';');
        if (firstCheck(splitStr[1], splitStr[0], splitStr[2], 'csv')){
            count++;
        }
    }

    return count;
};
