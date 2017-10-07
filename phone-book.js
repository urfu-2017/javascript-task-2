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
    phone = formatPhoneNumber(phone);
    if (isInputValid(name, phone, email) && !isAlreadyAdded(name)) {
        let phoneBookEntry;
        if (email !== undefined) {
            phoneBookEntry = { name, phone, email };
        } else {
            phoneBookEntry = { name, phone };
        }
        phoneBook.push(phoneBookEntry);
        sortPhoneBook();

        return true;
    }

    return false;
};

function isInputValid(name, phone, email) {
    return isInputCorrect(name, phone) && emailIsValid(email);
}

function emailIsValid(email) {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    return regex.test(email) || email === undefined;
}

function isInputCorrect(name, phone) {
    const regex = /^[+][7][\s]\(\d{3}\)[\s](\d{3})[-](\d{2})[-](\d{2})$/;

    return name && regex.test(phone);
}

function sortPhoneBook() {
    const phoneBookCopy = [];
    const namesArray = [];
    for (const entry of phoneBook) {
        namesArray.push(entry.name);
    }

    phoneBook = sortNamesAndMakePB(namesArray, phoneBookCopy);
}

function sortNamesAndMakePB(namesArray, phoneBookCopy) {
    for (const name of namesArray.sort()) {
        phoneBookCopy.push(getEntryByName(name));
    }

    return phoneBookCopy;
}

function getEntryByName(name) {
    for (const entry of phoneBook) {
        if (name === entry.name) {
            return entry;
        }
    }
}

function isAlreadyAdded(name) {
    for (const entry of phoneBook) {
        if (entry.name === name) {
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
        if (entry.name === name && email !== undefined &&
             isInputValid(name, formatPhoneNumber(phone), email)) {
            entry.phone = formatPhoneNumber(phone);
            entry.email = email;
            sortPhoneBook();

            return true;
        } else if (entry.name === name &&
            isInputValid(name, formatPhoneNumber(phone), email)) {
            entry.phone = formatPhoneNumber(phone);
            delete entry.email;
            sortPhoneBook();

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
    sortPhoneBook();
    const phoneBookCopy = phoneBook.slice();
    for (const entry of phoneBook) {
        if (entry.name.indexOf(query) !== -1 ||
        entry.phone.indexOf(query) !== -1 ||
        (entry.email !== undefined && entry.email.indexOf(query) !== -1)) {
            phoneBookCopy.splice(phoneBookCopy.indexOf(entry), 1);
            counter++;
        }
    }
    phoneBook = phoneBookCopy;
    sortPhoneBook();

    return counter;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {[]}
 */
exports.find = function (query) {
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
    for (const entry of phoneBook) {
        if (entry.name.indexOf(query) !== -1 ||
        entry.phone.indexOf(query) !== -1 ||
        entry.email.indexOf(query) !== -1) {
            arrayToReturn.push(Object.values(entry).join(', '));
        }
    }

    return arrayToReturn;
}

function createArrayOfStrings() {
    const arrayOfStrings = [];
    for (const entry of phoneBook) {
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
        if (isInputValid(name, formatPhoneNumber(phone), email) &&
        !isAlreadyAdded(name)) {
            phonesAdded++;
            exports.add(phone, name, email);
        } else if (isInputValid(name, formatPhoneNumber(phone), email)) {
            phonesAdded++;
            exports.update(phone, name, email);
        }
    }

    return phonesAdded;
};

