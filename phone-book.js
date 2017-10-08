'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook = {};
var phoneRegex = /^\d{10}$/;

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean} result of addition
 */
exports.add = function (phone, name, email) {
    if (phoneRegex.test(phone) && name && !phoneBook.hasOwnProperty(phone)) {
        phoneBook[phone] = [name, email];

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean} result of update
 */
exports.update = function (phone, name, email) {
    if (name && phoneBook.hasOwnProperty(phone)) {
        phoneBook[phone] = [name, email];

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} number of entries
 */
exports.findAndRemove = function (query) {
    let removeCounter = 0;
    // if (query) {
    //     if (query === '*') {
    //         Object.keys(phoneBook).forEach(property => {
    //             delete phoneBook[property];
    //             removeCounter++;
    //         });
    //     }
    //     Object.keys(phoneBook).forEach(phone => {
    //         const entry = phoneBook[phone];
    //         if (phone.includes(query)) {
    //             delete phoneBook[phone];
    //             removeCounter++;
    //         }
    //         Object.keys(entry).forEach(property => {
    //             if (entry[property] && entry[property].includes(query)) {
    //                 delete phoneBook[phone];
    //                 removeCounter++;
    //             }
    //         });
    //     });
    // }
    findEntries(query).forEach(entry => {
        let [, phone] = entry;
        delete phoneBook[phone];
        removeCounter++;
    });


    return removeCounter;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array} result of addition
 */
exports.find = function (query) {

    // let unsortedResultList = [];
    // if (query === '*') {
    //     unsortedResultList = listWholeBook();
    // } else {
    //     Object.keys(phoneBook).forEach(phone => {
    //         const entry = phoneBook[phone];
    //         if (phone.includes(query)) {
    //             unsortedResultList.push([entry.name, phoneFormat(phone), entry.email]
    //                 .filter(val => val)
    //                 .join(', '));
    //         }
    //         Object.keys(entry).forEach(property => {
    //             if (entry[property] && entry[property].includes(query)) {
    //                 unsortedResultList.push([entry.name, phoneFormat(phone), entry.email]
    //                     .filter(val => val)
    //                     .join(', '));
    //             }
    //         });
    //     });
    // }

    // return unsortedResultList.sort((a, b) => {
    //     if (a < b) {
    //         return -1;
    //     }
    //     if (a > b) {
    //         return 1;
    //     }
    //
    //     return 0;
    // });
    //
    return findEntries(query).sort()
        .map(entry => {
            entry[1] = phoneFormat(entry[1]);

            return entry.join(', ');
        });
};

function findEntries(query) {
    let entries = [];
    Object.keys(phoneBook).forEach(function (phone) {
        const [name, email] = phoneBook[phone];
        const entry = [name, phone, email];
        if (entry.filter(property => String(property).indexOf(query) !== - 1).length ||
            query === '*') {
            entries.push(entry.filter(property => property));
        }

    });

    return entries;
}


function phoneFormat(phone) {

    return String('+7 (' +
        phone.slice(0, 3) + ') ' +
        phone.slice(3, 6) + '-' +
        phone.slice(6, 8) + '-' + phone.slice(8, 10));

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
    let entryCounter = 0;
    if (csv) {
        csv.split('\n').forEach(entry => {
            let [name, phone, email] = entry.split(';');
            if (this.add(phone, name, email) || this.update(phone, name, email)) {
                entryCounter++;
            }
        });
    }

    return entryCounter;
};
