'use strict';

exports.isStar = true;

var phoneBook = [];

exports.add = function (phone, name, email) {
    if (isValidInput(name, phone) && !isAlreadyAdded(phone)) {
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

function isValidInput(name, phone) {
    const regex = /^\d{10}$/;

    return name && regex.test(phone);
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

exports.update = function (phone, name, email) {
    for (let entry of phoneBook) {
        if (entry.phone === phone && isValidInput(name, phone)) {
            entry.name = name;
            entry.email = email;

            return true;
        }
    }

    return false;
};

exports.findAndRemove = function (query) {
    let phoneBookCopy = phoneBook.slice();
    const phonesToRemove = getPhones(exports.find(query));
    for (const entry of phoneBook) {
        if (phonesToRemove.includes(formatPhoneNumber(entry.phone))) {
            phoneBookCopy.splice(getIndex(entry, phoneBookCopy), 1);
        }
    }
    phoneBook = phoneBookCopy;

    return phonesToRemove.length;
};

function getIndex(entry, phoneBookCopy) {
    for (let i = 0; i < phoneBookCopy.length; i++) {
        if (phoneBookCopy[i].phone === entry.phone) {
            return i;
        }
    }

    return null;
}

function getPhones(entries) {
    const phones = [];
    for (const entry of entries) {
        phones.push(entry.split(', ')[1]);
    }

    return phones;
}

exports.find = function (query) {
    if (!query || typeof query !== 'string') {
        return [];
    }
    switch (query) {
        case '*':
            return getAllEntries();
        default:
            return getMatchingEntries(query);
    }
};

function getMatchingEntries(query) {
    const arrayToReturn = [];
    for (const entry of phoneBook.sort(compare)) {
        if (isInEntry(entry, query)) {
            const emailStr = (entry.email) ? ', ' + entry.email : '';
            arrayToReturn.push(entry.name + ', ' + formatPhoneNumber(entry.phone) + emailStr);
        }
    }

    return arrayToReturn;
}

function isInEntry(entry, query) {
    for (let i = 0; i < Object.values(entry).length; i++) {
        const property = Object.values(entry)[i];
        if (property && property.indexOf(query) !== -1) {
            return true;
        }
    }

    return false;
}

function getAllEntries() {
    const arrayOfStrings = [];
    for (const entry of phoneBook.sort(compare)) {
        const emailStr = entry.email ? ', ' + entry.email : '';
        arrayOfStrings.push(entry.name + ', ' + formatPhoneNumber(entry.phone) + emailStr);
    }

    return arrayOfStrings;
}

exports.importFromCsv = function (csv) {
    let phonesAdded = 0;
    const entryStrings = csv.split('\n');
    for (const entryString of entryStrings) {
        const [name, phone, email] = entryString.split(';');
        if (exports.add(phone, name, email) || exports.update(phone, name, email)) {
            phonesAdded++;
        }
    }

    return phonesAdded;
};
