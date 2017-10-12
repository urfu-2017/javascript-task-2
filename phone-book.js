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
    if (!testAdd(phone, name)) {
        return false;
    }
    phoneBook.push({ phone, name, email });

    return true;
};

// Тесты на проверку при добавлении в справочник на
// наличие имени 
// чтобы не было совпадений номеров телефонов
// костыльная проверка формата номера телефона 
function testAdd(phone, name) {
    if (typeof (phone) !== 'undefined' && phone.length !== 10 || phone.match(/[^\d]/g, '')) {
        return false;
    }
    if (!moreTest(phone) || !moreTest(name) || !test2(phone)) {
        return false;
    }

    return true;
}

function test2(phone) {
    for (var str in phoneBook) {
        if (!phoneBook.hasOwnProperty(str)) {
            continue;
        }
        var element = phoneBook[str];
        if (element.phone.indexOf(phone) !== -1) {
            return false;
        }

    }

    return true;
}

function moreTest(value) {
    if (typeof (value) === 'undefined' || value === '' || !value) {
        return false;
    }

    return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 * @returns {Boolean}
 */
exports.update = function (phone, name, email) {
    if (!moreTest(name) || !moreTest(phone)) { // если имя задано, то обрабатывать
        return false;
    }
    for (var str in phoneBook) {
        if (!phoneBook.hasOwnProperty(str)) {
            continue;
        }
        var element = phoneBook[str];
        if (element.phone.indexOf(phone) !== -1) {
            element.phone = phone;
            element.name = name;
            element.email = email;
        }
    }

    return true;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Integer}
 */
exports.findAndRemove = function (query) {
    let arr = [];
    if (query === '*') {
        let i = 0;
        for (i = 0; i <= phoneBook.length; i++) {
            phoneBook.splice(0, 1);
        }

        return i;
    }
    arr = testValues(query);
    arr.reverse();
    arr.forEach(function (indexOfElem) {
        phoneBook.splice(indexOfElem, 1);
    }, this);

    return arr.length;
};

function testValues(query) {
    let index = 0;
    let arr = [];
    for (var str in phoneBook) {
        if (!phoneBook.hasOwnProperty(str)) {
            continue;
        }
        var element = phoneBook[str];
        if (typeof (element.phone) !== 'undefined' && element.phone.indexOf(query) !== -1) {
            arr.push(index);
        }
        if (typeof (element.name) !== 'undefined' && element.name.indexOf(query) !== -1) {
            arr.push(index);
        }
        if (typeof (element.email) !== 'undefined' && element.email.indexOf(query) !== -1) {
            arr.push(index);
        }
        index++;
    }

    return arr;
}


/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {Array}
 */
exports.find = function (query) {
    let answer = [];
    if (query === '' || !moreTest(query)) {
        return [];
    }
    if (query === '*') {
        answer = find1();
    }
    if (typeof (query) === 'undefined') {
        return null;
    }
    answer = find2(query);

    return answer.sort();
};

function find1() {
    let answer = [];
    for (var str in phoneBook) {
        if (!phoneBook.hasOwnProperty(str)) {
            continue;
        }
        var element = phoneBook[str];
        if (typeof (element.phone) !== 'undefined') {
            answer.push(sortAndExport(element));
        }
    }

    return answer;
}

function find2(query) {
    let answer = [];
    for (var str in phoneBook) {
        if (!phoneBook.hasOwnProperty(str)) {
            continue;
        }
        var element = phoneBook[str];
        if (typeof (element.phone) !== 'undefined' && element.phone.indexOf(query) !== -1) {
            answer.push(sortAndExport(element));
        }
        if (typeof (element.name) !== 'undefined' && element.name.indexOf(query) !== -1) {
            answer.push(sortAndExport(element));
        }
        if (typeof (element.email) !== 'undefined' && element.email.indexOf(query) !== -1) {
            answer.push(sortAndExport(element));
        }
    }

    return answer;
}

function sortAndExport(obj) {
    let o;
    let name = obj.name;
    let phone = '+7 (' + obj.phone.slice(0, 3) + ') ' + obj.phone.slice(3, 6) + '-' +
        obj.phone.slice(6, 8) + '-' + obj.phone.slice(8, 10);
    let email;
    if (typeof (obj.email) === 'undefined') {
        o = name + ', ' + phone;
    } else {
        email = obj.email;
        o = name + ', ' + phone + ', ' + email;
    }

    return o;
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
    let par = csv.split('\n');
    let count = 0;
    par.forEach(function (element) {
        let parts = element.split(';');
        let boo = exports.update(parts[0], parts[1], parts[2]);
        let poo = exports.add(parts[0], parts[1], parts[2]);
        if (boo || poo) {
            count++;
        }
    }, this);

    return count;
};
