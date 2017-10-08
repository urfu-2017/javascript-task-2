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

function phoneIsValid(phone) {
    return phone && phone.length === 10 && !phone.match(/[^0-9]/gi) && !isNaN(Number(phone));
}

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

exports.add = function (phone, name, email) {
    if (!phoneIsValid(phone) || !name || typeof name !== 'string') {
        return false;
    }

    let checkPhoned = phoneBook.some(function (record) {

        return record.phone === phone;
    });

    if (!checkPhoned) {
        phoneBook.push({ 'name': name, 'phone': phone, 'email': email });

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

exports.update = function (phone, name, email) {
    if (typeof name !== 'string' || !name) {
        return false;
    }
    let indexPhoned = -1;
    let findPhoned = phoneBook.some(function (record, index) {
        indexPhoned = index;

        return record.phone === phone;
    });
    if (findPhoned && name) {
        phoneBook[indexPhoned].name = name;
        phoneBook[indexPhoned].phone = phone;
        phoneBook[indexPhoned].email = email;

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */

exports.findAndRemove = function (query) {
    if (query === '') {
        return 0;
    }
    if (query === '*') {
        let del = phoneBook.length;
        phoneBook = [];

        return del;
    }
    let foundingRecord = phoneBook.filter(function (record) {
        if (record.name.indexOf(query) !== -1 || record.phone.indexOf(query) !== -1) {
            return true;
        }
        if (record.email) {
            return record.email.indexOf(query) !== -1;
        }

        return false;
    });
    phoneBook = phoneBook.filter(function (record) {
        let flag = true;

        foundingRecord.forEach(function (item) {
            if (item.phone === record.phone) {
                flag = false;
            }
        });

        return flag;
    });

    return foundingRecord.length;
};

function phoneToString(phone) {
    return '+7 (' + phone.substring(0, 3) + ') ' +
        phone.substring(3, 6) + '-' +
        phone.substring(6, 8) + '-' +
        phone.substring(8, 10);
}

function objectToString(record) {
    let name = record.name;
    let phone = phoneToString(record.phone);
    if (record.email) {

        return name + ', ' + phone + ', ' + record.email;
    }

    return name + ', ' + phone;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */

exports.find = function (query) {
    if (query === '') {
        return [];
    }
    if (query === '*') {
        return phoneBook.map(objectToString)
            .sort();
    }
    let res = phoneBook.filter(function (record) {
        if (record.name.indexOf(query) !== -1 || record.phone.indexOf(query) !== -1) {
            return true;
        }
        if (record.email) {
            return record.email.indexOf(query) !== -1;
        }

        return false;
    }).map(objectToString)
        .sort();

    return res;
};

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {
    function addRecordInBook(record) {
        let item = record.split(';');
        let name = item[0];
        let phone = item[1];
        let email = item[2];
        if (exports.add(phone, name, email) ||
            exports.update(phone, name, email)) {
            return 1;
        }

        return 0;
    }

    let book = csv.split('\n');
    let addRecord = 0;
    for (let i = 0; i < book.length; i++) {
        let record = book[i];
        addRecord += addRecordInBook(record);
    }

    return addRecord;
};
