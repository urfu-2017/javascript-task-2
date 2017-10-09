'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = {};
exports.phoneBook = phoneBook;

function checkInputCorrect(phone, name, email) {
    return checkName(name) && checkPhone(phone) && checkEmail(email);
}

function checkName(name) {
    return name !== '' && name !== undefined && typeof(name) === 'string';
}

function checkEmail(email) {
    if (email === undefined) {
        return true;
    }
    if (email !== undefined && typeof(email) === 'string') {
        return true;
    }

    return false;
}

function checkPhone(phone) {
    return phone !== undefined && /[0-9]{10}/.test(phone) && typeof(phone) === 'string';
}

// На вход принимает «Телефон», «Имя» и «Электронную почту»
// Возвращает true или false в зависимости от успеха опереации
// Телефоны принимаются **только** в формате 5556667788 (без кода)
// Не добавляет **уже существующую** запись
// Не добавляет запись **без имени**

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Dict}
 */
exports.add = function (phone, name, email) {
    if (checkInputCorrect(phone, name, email) && !(phone in phoneBook)) {
        if (email === undefined) {
            phoneBook[phone] = `${phone}, ${name}`;
        } else {
            phoneBook[phone] = `${phone}, ${name}, ${email}`;
        }

        return true;
    }

    return false;
};

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
// На вход принимает «Телефон», «Имя» и «Электронную почту»
// Обновляет «Имя» и «Электронную почту» по заданному «Телефону»
// Возвращает true или false в зависимости от успеха опереации
// «Электронную почту» можно стереть (не передав последний параметр), а «Имя» – нет
exports.update = function (phone, name, email) {
    if (checkInputCorrect(phone, name, email) && phone in phoneBook) {
        if (email !== undefined) {
            phoneBook[phone] = `${phone}, ${name}, ${email}`;
        } else {
            phoneBook[phone] = `${phone}, ${name}`;
        }

        return true;
    }

    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
// На вход принимает запрос в виде строки
// Находит (смотри __find__) и удаляет все найденные записи
// Возвращает число удаленных записей
exports.findAndRemove = function (query) {
    let countDeleted = 0;
    if (typeof(query) === 'string') {
        let foundEntries = exports.find(query);
        foundEntries.forEach(entry => {
            let number = entry.split(', ')[1].replace(/\s|-|\(|\)/g, '').slice(2);
            delete phoneBook[number];
            countDeleted += 1;
        });
    }

    return countDeleted;
};

function searchSubstring(query, entries) {
    let foundEntries = [];
    if (query !== '*') {
        foundEntries = entries.filter(entry => entry.match(query));
    } else {
        foundEntries = entries;
    }

    return foundEntries;
}

function formatPhone(phone) {
    return `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8)}`;
}

function formFoundData(foundEntries) {
    let foundStrings = [];
    foundEntries.forEach(item => {
        let entries = item.split(', ');
        if (entries[2] !== undefined) {
            foundStrings.push(`${entries[1]}, ${formatPhone(entries[0])}, ${entries[2]}`);
        } else {
            foundStrings.push(`${entries[1]}, ${formatPhone(entries[0])}`);
        }
    });

    return foundStrings;
}

// На вход принимает запрос в виде строки
// Ищет вхождение этой строки хотя бы в одно из полей «Телефон», «Имя» и «Электронную почту»
// Возвращает отсортированный по «Имени» массив строк в формате `name, phone, email`
// «Имя» и «Электронную почту» выводит как есть, а «Телефон» в формате `+7 (555) 666-77-88`
// Пустой запрос не должен ничего находить
// Запрос «*» находит все записи

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    if (typeof(query) === 'string') {
        if (query === '') {
            return [];
        }
        let entries = Object.values(phoneBook);
        let foundEntries = searchSubstring(query, entries);

        return formFoundData(foundEntries).sort();
    }

    return [];
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
    if (typeof(csv) === 'string' && csv.split() !== '') {
        let data = csv.split('\n');
        let countBefore = Object.keys(phoneBook).length;
        let countUpdate = 0;
        data.forEach(item => {
            let entriesArray = item.split(';');
            if (!exports.add(entriesArray[1], entriesArray[0], entriesArray[2])) {
                if (exports.update(entriesArray[1], entriesArray[0], entriesArray[2])) {
                    countUpdate += 1;
                }
            }
        });
        let countAfter = Object.keys(phoneBook).length;

        return countAfter - countBefore + countUpdate;
    }

    return 0;
};
