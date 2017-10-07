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

/*
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */

function isValidPhone(phone) {

    return /^\d{10}$/.test(phone);
}

exports.add = function (phone, name, email) {


    if (isValidPhone(phone) && name) {

        let isPhoneExists = phoneBook.some(function (element) {
            return element.phone === phone;
        });

        if (!isPhoneExists) {

            phoneBook.push({ phone, name, email });

            return true;
        }
    }

    return false;
};


/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {

    let success = false;

    if (isValidPhone(phone)) {

        phoneBook.forEach(function (element) {

            if (element.phone === phone && name) {

                element.name = name;
                element.email = email;

                success = true;
            }
        });
    }

    return success;
};


function findFields(query, phone, name, email) {
    if (name.indexOf(query) !== -1 || phone.indexOf(query) !== -1) {

        return true;
    }

    return email !== undefined && email.indexOf(query) !== -1;


}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} count
 */
exports.findAndRemove = function (query) {

    let count = 0;

    if (typeof(query) !== 'string' || !query) {
        return 0;
    }
    if (query === '*') {
        query = '';
    }

    for (let i = 0; i < phoneBook.length; i++) {

        let cond = findFields(query, phoneBook[i].phone, phoneBook[i].name, phoneBook[i].email);

        if (cond) {
            phoneBook.splice(i, 1);
            i--;
            count++;
        }
    }

    return count;

};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array} filtered phonebook
 */
exports.find = function (query) {

    if (typeof(query) !== 'string' || query === '') {
        return [];
    }

    if (query === '*') {
        return formatOutput(phoneBook);
    }


    return formatOutput(phoneBook.filter(function (element) {

        return element.email ? (element.phone.indexOf(query) !== -1 ||
            element.name.indexOf(query) !== -1 || element.email.indexOf(query) !== -1)
            : (element.phone.indexOf(query) !== -1 || element.name.indexOf(query) !== -1);
    }));

};

function formatOutput(list) {

    return list.map(function (entry) {
        let result = [];
        result.push(entry.name);
        result.push(formatPhone(entry.phone));
        if (entry.email) {
            result.push(entry.email);
        }

        return result.join(', ');

    }).sort();

}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function (csv) {

    if (!csv) {
        return 0;
    }
    let entries = csv.split('\n');
    let entry;
    let updateCount = 0;

    entries.forEach((rec) => {
        entry = rec.split(';');
        if ((exports.add(entry[1], entry[0], entry[2])) ||
        exports.update(entry[1], entry[0], entry[2])) {
            updateCount++;
        }
    }
    );

    return updateCount;
};

function formatPhone(phone) {
    return `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8)}`;
}
