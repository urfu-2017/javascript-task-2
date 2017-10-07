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
    if (isInputValid(name, phone) && !isAlreadyAdded(name)) {
        let phoneBookEntry;
        if (email !== undefined && email !== '') {
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


function isInputValid(name, phone) {
    const regex = /^[+][7][\s]\(\d{3}\)[\s](\d{3})[-](\d{2})[-](\d{2})$/;
    const nameIsValid = name !== '' && typeof name === 'string';

    return nameIsValid && regex.test(phone) && typeof phone === 'string' &&
     !phoneIsAlreadyAdded(phone, name);
}

function phoneIsAlreadyAdded(phone, name) {
    for (const entry of phoneBook) {
        if (entry.phone === phone && entry.name !== name) {
            return true;
        }
    }

    return false;
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
             isInputValid(name, formatPhoneNumber(phone))) {
            entry.phone = formatPhoneNumber(phone);
            entry.email = email;
            sortPhoneBook();

            return true;
        } else if (entry.name === name &&
            isInputValid(name, formatPhoneNumber(phone))) {
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
    const entriesToRemove = exports.find(query);
    const namesToRemove = getNames(entriesToRemove);
    counter = entriesToRemove.length;
    for (const entry of phoneBook) {
        if (namesToRemove.includes(entry.name)) {
            // phoneBookCopy.splice(phoneBookCopy.indexOf(entry), 1);
            delete phoneBookCopy[entry];
        }
    }
    phoneBook = phoneBookCopy;
    sortPhoneBook();

    return counter;
};

function getNames(entries) {
    const names = [];
    for (const entry of entries) {
        names.push(entry.split(', ')[0]);
    }

    return names;
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
    for (const entry of phoneBook) {
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
        if (isInputValid(name, formatPhoneNumber(phone)) &&
        !isAlreadyAdded(name)) {
            phonesAdded++;
            exports.add(phone, name, email);
        } else if (isInputValid(name, formatPhoneNumber(phone))) {
            phonesAdded++;
            exports.update(phone, name, email);
        }
    }

    return phonesAdded;
};

