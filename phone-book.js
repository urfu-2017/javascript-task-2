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

const REG_EMAIL = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
const REG_PHONE = /^\d{10}$/;

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {boolean} - возвращает true или false в зависимости от успеха опереации
 */
exports.add = function (phone, name, email) {
    if (name && REG_PHONE.test(phone)) {
        if (phoneBook.some(contact => contact.phone === phone)) {
            return false;
        }
        if (!email) {
            phoneBook.push({
                name,
                phone
            });
        } else if (REG_EMAIL.test(email)) {
            phoneBook.push({
                name,
                phone,
                email
            });
        } else {
            return false;
        }
    } else {
        return false;
    }

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
    if (!name || !REG_PHONE.test(phone)) {
        return false;
    }
    var contactIndex = phoneBook.findIndex(contact => {
        return contact.phone === phone;
    });
    if (contactIndex === -1) {
        return false;
    }
    if (!email) {
        delete phoneBook[contactIndex].email;
    } else if (REG_EMAIL.test(email)) {
        phoneBook[contactIndex].email = email;
        phoneBook[contactIndex].name = name;
    } else {
        return false;
    }

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
        if (containsQuery(phoneBook[i], query)) {
            phoneBook.splice(i, 1);
            ++deleteCount;
            --i;
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
    if (!csv) {
        return 0;
    }
    var contacts = csv.split(/\r?\n+/);
    let contactCount = 0;
    contacts.forEach(contact => {
        var splitContact = contact.split(/;/);
        if (module.exports.add(splitContact[1], splitContact[0], splitContact[2]) ||
            module.exports.update(splitContact[1], splitContact[0], splitContact[2])) {
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
    let lineContact = contact.name + ', ' + formatPhone(contact.phone);
    if (contact.email !== undefined) {
        lineContact += ', ' + contact.email;
    }

    return lineContact;
}
