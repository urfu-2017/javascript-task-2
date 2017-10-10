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

const REG_EMAIL = /^[0-9a-z-.]+@[0-9a-z-]{2,}.[a-z]{2,}$/i;
const REG_PHONE = /\d{10}/;
const REG_NAME = /[а-яё\w-]+/i;

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean} - возвращает true или false в зависимости от успеха опереации
 */
exports.add = function (phone, name, email) {
    let newContact = {};
    if (name !== undefined && REG_NAME.exec(name) && REG_PHONE.exec(phone)) {
        newContact.name = name;
        if (email === undefined) {
            newContact.phone = phone;
        } else if (REG_EMAIL.exec(email)) {
            newContact.phone = phone;
            newContact.email = email;
        }
    } else {
        return false;
    }
    if (phoneBook.some(contact => contact.phone === phone || contact.email === email)) {
        return false;
    }
    phoneBook.push(newContact);

    return true;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean} - возвращает true или false в зависимости от успеха опереации
 */
exports.update = function (phone, name, email) {
    if (name === undefined || !REG_NAME.exec(name) || !REG_PHONE.exec(phone)) {
        return false;
    }
    phoneBook.forEach(function (contact) {
        if (contact.phone === phone) {
            contact.name = name;
            if (email === undefined) {
                delete contact.email;
            } else if (REG_EMAIL.exec(email)) {
                contact.email = email;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number} - количество удаленных записей
 */
exports.findAndRemove = function (query) {
    if (!query) {
        return 0;
    }
    let deleteCount = 0;
    if (query === '*') {
        deleteCount = phoneBook.length;
        phoneBook = [];

        return deleteCount;
    }
    for (let i = 0; i < phoneBook.length; ++i) {
        const contact = phoneBook[i];
        if (containsQuery(contact, query)) {
            ++deleteCount;
            phoneBook.slice(i, 1);
        }
    }

    return deleteCount;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array} - отсортированный по «Имени» массив записей, удовлетворяющих запросу
 */
exports.find = function (query) {
    let result = [];
    if (!query) {
        return result;
    }
    phoneBook.sort(sortContacts);
    if (query === '*') {
        phoneBook.forEach(function (contact) {
            result.push(formatContact(contact));
        });

        return result;
    }
    phoneBook.forEach(contact => {
        if (containsQuery(contact, query)) {
            result.push(formatContact(contact));
        }
    });

    return result;
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
    var contacts = csv.split(/\r?\n+/);
    let contactCount = 0;
    let newContact = false;
    contacts.forEach(contact => {
        var splitContact = contact.split(/;/);
        if (module.exports.find(splitContact[1]) === 0) {
            newContact = module.exports.add(splitContact[0], splitContact[1], splitContact[2]);
        } else {
            newContact = module.exports.update(splitContact[1], splitContact[0], splitContact[2]);
        }
        if (newContact) {
            ++contactCount;
        }
    });

    return contactCount;
};

function containsQuery(contact, query) {
    return checkValue(contact, 'name', query) || checkValue(contact, 'phone', query) ||
            checkValue(contact, 'email', query);
}

function checkValue(contact, value, query) {
    if (contact[value] !== undefined) {
        if (contact[value].indexOf(query) !== -1) {
            return true;
        }
    }

    return false;
}

function sortContacts(a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }

    return 0;
}

function formatPhone(phone) {
    return '+7 (' + phone.substr(0, 3) + ') ' + phone.substr(3, 3) + '-' +
            phone.substr(6, 2) + '-' + phone.substr(8, 2);
}

function formatContact(contact) {
    let line = contact.name + ', ' + formatPhone(contact.phone);
    if (contact.email !== undefined) {
        line += ', ' + contact.email;
    }

    return line;
}
