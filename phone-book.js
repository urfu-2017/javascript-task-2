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
    if (isInputValid(name, phone) && !isAlreadyAdded(formatPhoneNumber(phone))) {
        phone = formatPhoneNumber(phone);
        let phoneBookEntry;
        if (email) {
            phoneBookEntry = { name, phone, email };
        } else {
            phoneBookEntry = { name, phone };
        }
        phoneBook.push(phoneBookEntry);

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

function isInputValid(name, phone) {
    const regex = /^\d{10}$/;
    const nameIsValid = name !== '' && typeof name === 'string';

    return nameIsValid && regex.test(phone) && typeof phone === 'string';
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
    const numbers = String(phone).split('');
    const formattedPhone = '+7 (' + spliceAndJoin(numbers, 0, 3) + ') ' +
     spliceAndJoin(numbers, 0, 3) + '-' +
     spliceAndJoin(numbers, 0, 2) + '-' +
     spliceAndJoin(numbers, 0, 2);

    return formattedPhone;
}

function spliceAndJoin(inputArray, from, to) {
    return inputArray.splice(from, to).join('');
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    for (const entry of phoneBook) {
        if (entry.phone === formatPhoneNumber(phone) && email !== undefined &&
             isInputValid(name, phone)) {
            entry.name = name;
            entry.email = email;

            return true;
        } else if (entry.phone === formatPhoneNumber(phone) &&
            isInputValid(name, phone)) {
            entry.name = name;
            delete entry.email;

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
    let counter = 0;
    const phoneBookCopy = phoneBook.slice();
    const entriesToRemove = exports.find(query);
    const phonesToRemove = getPhones(entriesToRemove);
    counter = entriesToRemove.length;
    for (const entry of phoneBook) {
        if (phonesToRemove.includes(entry.phone)) {
            delete phoneBookCopy[entry];
        }
    }
    phoneBook = phoneBookCopy;

    return counter;
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
 * @returns {[]}
 */
exports.find = function (query) {
    if (typeof query !== 'string') {
        return [];
    }
    switch (query) {
        case '':
            return [];
        case '*':
            return createArrayOfStrings();
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
            arrayToReturn.push(Object.values(entry).join(', '));
        }
    }

    return arrayToReturn;
}

function createArrayOfStrings() {
    const arrayOfStrings = [];
    for (const entry of phoneBook.sort(compare)) {
        arrayOfStrings.push(Object.values(entry).join(', '));
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
    var entryStrings = csv.split('\n');
    for (const entryString of entryStrings) {
        const name = entryString.split(';')[0];
        const phone = entryString.split(';')[1];
        const email = entryString.split(';')[2];
        if (isInputValid(name, phone) &&
        !isAlreadyAdded(formatPhoneNumber(phone))) {
            phonesAdded++;
            exports.add(phone, name, email);
        } else if (isInputValid(name, phone)) {
            phonesAdded++;
            exports.update(phone, name, email);
        }
    }

    return phonesAdded;
};
