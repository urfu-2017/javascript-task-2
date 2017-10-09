'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;
exports.update = update;
exports.add = add;

/**
 * Телефонная книга
 */
var phoneBook = [];

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
function add(phone, name, email) {
    if (name === null || name === undefined || name.length === 0) {
        return false;
    }
    if (!/^\d{10}$/.test(phone)) {
        return false;
    }
    if (phoneBook.some(record => record.phone === phone)) {
        return false;
    }
    phoneBook.push({ phone, name, email });

    return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
function update(phone, name, email) {
    if (name === null || name === undefined || name.length === 0) {
        return false;
    }
    for (let index = 0; index < phoneBook.length; index++) {
        let record = phoneBook[index];
        if (record.phone === phone) {
            phoneBook[index].name = name;
            phoneBook[index].email = email;

            return true;
        }
    }

    return false;
}


/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
exports.findAndRemove = function (query) {
    let records = filterByQuery(query);
    for (let { index } of records) {
        delete phoneBook[index];
    }
    clearArray(phoneBook);

    return records.length;
};

/**
 * Удаляет элементы в массиве array со значением undefined 
 * @param {Array} array 
 */
function clearArray(array) {
    let index = 0;
    while (index < array.length) {
        if (!array[index]) {
            array.splice(index, 1);
            continue;
        }
        index++;
    }
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    const records = filterByQuery(query);
    records.sort((a, b) => a.name.localeCompare(b.name));
    records.forEach(value => {
        const tempResult = [value.name, formatPhone(value.phone)];
        if (value.email !== undefined && value.email !== '') {
            tempResult.push(value.email);
        }
        value.result = tempResult.join(', ');
    });
    const results = records.map(record => record.result);

    return results;
};

/**
 * Возвращает массив записей, отфильтрованных по строке query, 
 * добавляя к элементам массива поле index, 
 * принимающее значение равное индексу в phoneBook
 * @param {String} query 
 * @returns {Array}
 */
function filterByQuery(query) {
    if (query === '') {
        return [];
    }
    let copyPhoneBook = phoneBook.slice(0);
    copyPhoneBook.forEach((record, index) => {
        record.index = index;
    });
    if (query === '*') {
        return copyPhoneBook;
    }

    return copyPhoneBook.filter((item) => {
        if (item.name.indexOf(query) >= 0 ||
            item.phone.indexOf(query) >= 0 ||
            item.email !== undefined && item.email.indexOf(query) >= 0) {

            return true;
        }

        return false;
    });
}

/**
 * 
 * @param {String} phone 
 * @returns {String}
 */
function formatPhone(phone) {
    return '+7 (' + phone.substring(0, 3) + ') ' +
        phone.substring(3, 6) + '-' +
        phone.substring(6, 8) + '-' +
        phone.substring(8);
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
    if (!csv) {
        return 0;
    }
    const records = csv.split('\n');
    let count = 0;
    for (const record of records) {
        const [name, phone, email] = record.split(';');
        count += add(phone, name, email) || update(phone, name, email) ? 1 : 0;
    }

    return count;
};
