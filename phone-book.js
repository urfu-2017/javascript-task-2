'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 *  */

exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook = [];

function validData(phone, name) {
    if ((!/^\d{10}$/.test(String(phone)) || isNaN(Number(phone))) && validName(name)) {
        return false;
    }

    return true;
}

function validName(name) {
    if (name === '' || typeof name !== 'string') {
        return false;
    }

    return true;

}

function searchData(phon) {
    for (var i = 0; i < phoneBook.length; i++) {
        if
        (phoneBook[i].phone === phon) {

            return false;

        }
    }

    return true;

}
exports.add = function (phone, name, email) {
    if (validData(phone, name) && searchData(phone)) {
        var newContact = {
            phone: phone,
            name: name,
            email: email
        };
        phoneBook.push(newContact);

        return true;
    }

    return false;

};

exports.update = function (phone, name, email) {
    for (var i = 0; i < phoneBook.length; i++) {
        if
        (phoneBook[i].phone === phone) {
            phoneBook[i].name = name;
            phoneBook[i].email = email;

            return true;

        }
    }


};

exports.findAndRemove = function (query) {
    var result = phoneBook.filter(function (record) {
        if (record.name.indexOf(query) !== -1 || record.phone.indexOf(query) !== -1) {
            return true;
        }
        if (record.email) {
            return record.email.indexOf(query) !== -1;
        }

        return false;
    });
    for (var i = 0; i < result.length; i++) {
        phoneBook.splice(phoneBook.indexOf(result[i]), 1);
    }

    var res = result.length;

    return res;

};
exports.find = function (query) {
    var result = [];
    if (query === '') {
        return result;
    }
    if (query === '*') {
        for (var i = 0; i < phoneBook.length; i++) {
            result.push(outString(phoneBook[i].name, phoneBook[i].phone, phoneBook[i].email));

        }
    }
    var res = phoneBook.filter(function (record) {
        if (record.name.indexOf(query) !== -1 || record.phone.indexOf(query) !== -1) {
            return true;
        }
        if (record.email) {
            return record.email.indexOf(query) !== -1;
        }

        return false;
    });
    for (var j = 0; j < res.length; j++) {
        result.push(outString(res[j].name, res[j].phone, res[j].email));
    }

    return (result.sort());


};

function outString(name, phone, email) {
    let result = name;
    if (phone !== undefined) {
        result = result + ', ' + isFormatPhone(phone);
    }
    if (email !== undefined) {
        result = result + ', ' + email;
    }

    return result;
}

function isFormatPhone(phone) {
    return '+7 (' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' +
     phone.slice(6, 8) + '-' + phone.slice(8, 10);
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
    function addRecordInBook(record) {
        let cont = record.split(';');
        let name = cont[0];
        let phone = cont[1];
        let email = cont[2];
        if (exports.add(phone, name, email) ||
            exports.update(phone, name, email)) {
            return true;
        }

        return false;
    }

    let book = csv.split('\n');
    let addRecord = 0;
    for (let i = 0; i < book.length; i++) {
        let record = book[i];
        addRecord += addRecordInBook(record);
    }

    return addRecord;
};
