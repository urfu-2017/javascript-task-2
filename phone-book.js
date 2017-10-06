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


function verifyNumber(numberInStr) {
    return numberInStr.length === 10 && !isNaN(Number(numberInStr));
}


function verifyName(name) {
    return typeof name === 'string' && name !== '';
}


function equalsRecords(record, otherRecord) {
    return record.phone === otherRecord.phone;
}


/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.add = function (phone, name, email) {
    let record = {
        phone,
        name,
        email
    };
    for (let otherRecord of phoneBook) {
        if (equalsRecords(record, otherRecord)) {
            return false;
        }
    }
    if (verifyNumber(phone) && verifyName(name)) {
        phoneBook.push(record);

        return true;
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
    for (let otherRecord of phoneBook) {
        if (phone !== otherRecord.phone) {
            continue;
        }
        if (!verifyName(name)) {
            return false;
        }
        otherRecord.name = name;
        otherRecord.email = email;

        return true;
    }

    return false;
};


/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    let deletedCount = 0;
    for (let record of seachQuery(query)) {
        remove(phoneBook, record);
        deletedCount++;
    }

    return deletedCount;
};


function remove(array, value) {
    let index = array.indexOf(value);
    if (index === - 1) {
        return;
    }
    array.splice(index, 1);
}


function recordContainQuery(record, query) {
    for (let key in record) {
        if (typeof record[key] === 'string' && record[key].includes(query)) {
            return true;
        }
    }

    return false;
}


function seachQuery(query, sortFunction) {
    let suitableRecords = [];
    let sortedBook;
    if (sortFunction !== undefined) {
        sortedBook = phoneBook.slice().sort(sortFunction);
    } else {
        sortedBook = phoneBook;
    }
    if (query === '*') {
        return sortedBook;
    }
    if (query === '') {
        return [];
    }
    for (let record of sortedBook) {
        if (recordContainQuery(record, query)) {
            suitableRecords.push(record);
        }
    }

    return suitableRecords;
}


function sortByName(a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }

    return 0;
}


/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    let suitableFormattedStr = [];
    for (let record of seachQuery(query, sortByName)) {
        let phone = `+7 (${record.phone.substr(0, 3)}) ${record.phone.substr(3, 3)}-` +
                    `${record.phone.substr(6, 2)}-${record.phone.substr(8, 2)}`;
        let formattedStr;
        if (record.email === undefined) {
            formattedStr = `${record.name}, ${phone}`;
        } else {
            formattedStr = `${record.name}, ${phone}, ${record.email}`;
        }
        suitableFormattedStr.push(formattedStr);
    }

    return suitableFormattedStr;
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
    let changedCount = 0;
    for (let str of csv.split('\n')) {
        let [name, phone, email] = str.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            changedCount++;
        }
    }

    return changedCount;
};
