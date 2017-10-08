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

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean} 
 */
exports.add = function (phone, name, email) {
    if (isInputValid(name, phone, email) && !isAlreadyAdded(formatPhoneNumber(phone))) {
        phone = formatPhoneNumber(phone);
        phoneBook.push({ name, phone, email });

        return true;
    }

    return false;
};

function compare(first, second) {
    if (first.name < second.name) {
        return -1;
    }
    if (first.name > second.name) {
        return 1;
    }

    return 0;
}

function isInputValid(name, phone, email) {
    const regex = /^\d{10}$/;
    const nameIsValid = name !== '' && typeof name === 'string';

    return nameIsValid && regex.test(phone) && typeof phone === 'string' && email !== '';
}

function isAlreadyAdded(phone) {
    for (const entry of phoneBook) {
        if (entry.phone === phone) {
            return true;
        }
    }

    return false;
}

function formatPhoneNumber(phone) {
    return '+7 (' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' +
     phone.slice(6, 8) + '-' + phone.slice(8, 10);
}


/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    for (let entry of phoneBook) {
        if (entry.phone === formatPhoneNumber(phone) && name && typeof name === 'string') {
            entry.name = name;
            entry.email = email;

            return true;
        }
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} counter
 */
exports.findAndRemove = function (query) {
    const phoneBookCopy = phoneBook.slice();
    const phonesToRemove = getPhones(exports.find(query));
    for (const entry of phoneBook) {
        if (phonesToRemove.includes(entry.phone)) {
            delete phoneBookCopy[entry];
        }
    }
    phoneBook = phoneBookCopy;

    return phonesToRemove.length;
};

function getPhones(entries) {
    const phones = [];
    for (const entry of entries) {
        phones.push(entry.split(', ')[1]);
    }

    return phones;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {ArrayOfStrings}
 */
exports.find = function (query) {
    if (!query) {
        return [];
    }
    switch (query) {
        case '*':
            return createArrayOfAllStrings();
        default:
            return makeArrayOfSuitableStrings(query);
    }
};

function makeArrayOfSuitableStrings(query) {
    const arrayToReturn = [];
    for (const entry of phoneBook.sort(compare)) {
        if (entry.name.indexOf(query) !== -1 ||
        entry.phone.indexOf(query) !== -1 ||
        (entry.email && entry.email.indexOf(query) !== -1)) {
            const emailStr = (entry.email) ? ', ' + entry.email : '';
            arrayToReturn.push(entry.name + ', ' + entry.phone + emailStr);
        }
    }

    return arrayToReturn;
}

function createArrayOfAllStrings() {
    const arrayOfStrings = [];
    for (const entry of phoneBook.sort(compare)) {
        const emailStr = entry.email ? ', ' + entry.email : '';
        arrayOfStrings.push(entry.name + ', ' + entry.phone + emailStr);
    }

    return arrayOfStrings;
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
    let phonesAdded = 0;
    const entryStrings = csv.split('\n');
    for (const entryString of entryStrings) {
        const name = entryString.split(';')[0];
        const phone = entryString.split(';')[1];
        const email = entryString.split(';')[2];
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            phonesAdded++;
        }
    }

    return phonesAdded;
};
