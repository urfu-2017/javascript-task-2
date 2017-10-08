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

function phoneExist(phone) {
    let b1 = false;
    let i = 0;
    while (i < phoneBook.length && b1 === false) {
        b1 = (phoneBook[i].p === phone);
        ++i;
    }
    //  console.log('PHONEEXIST', phone, b1);

    return b1;
}

/*
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.add = function (phone, name, email) {
    var b1 = false;
    if (phone.length !== 10 || !name || phoneExist(phone) || name.length === 0) {
        b1 = false;
    } else {
        var newRecord = {
            n: name,
            p: phone
        };
        if (email) {
            newRecord.m = email;
        }
        phoneBook.push(newRecord);
        //                                      console.log(phoneBook, 'add');
        b1 = true;
    }
    //                                            console.log(b1);

    return b1;
};

/*
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.update = function (phone, name, email) {
    let i = 0;
    var b1 = false;
    if (!name || phone.length !== 10) {
        return false;
    }
    while (i < phoneBook.length && phoneBook[i].p !== phone) {
        //                                      console.log('update', phoneBook[i].p, phone, i);
        ++i;
    }
    if (i !== phoneBook.length && name) {
        phoneBook[i].n = name;
        if (email) {
            phoneBook[i].m = email;
        } else {
            delete phoneBook[i].m;
        }
        b1 = true;
    } else {
        b1 = false;
    }
    //                                          console.log(phoneBook, 'update');
    //                                          console.log(b1);

    return b1;
};

function deleter(query) {
    let i = 0;
    var count = 0;
    while (i < phoneBook.length) {
        if (checkInclude(i, query)) {
            //  console.log(phoneBook[i], count+1, phoneBook.length);
            phoneBook.splice(i, 1);
            count++;
            //                                  console.log(phoneBook, 'f&r');
        } else {
            i++;
        }
    }

    return count;
}

/*
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
exports.findAndRemove = function (query) {
    var count = 0;
    if (typeof(query) !== 'string' || query === '') {
        count = 0;
    } else if (query === '*') {
        count = phoneBook.length;
        phoneBook.splice(0);
    } else {
        count = deleter(query);
    }
    //          console.log(phoneBook, 'f&r');
    //          console.log(count);

    return count;
};

function checkInclude(i, query) {
    let b1 = false;
    //  var a = [];
    //  a[0] = phoneBook[i].n.toLowerCase();
    //  a[0] = phoneBook[i].n;
    //  a[0] = a[0].toLowerCase();
    //  a[1] = phoneBook[i].p;
    //  a[2] = phoneBook[i].m || '';
    //  console.log(i, query, phoneBook[i]);
    let values = Object.values(phoneBook[i]);
    for (let value of values) {

    /* console.log(value, '\n', String(value), '\n',
    String(value).indexOf(query), '\n', query);*/
    //    for (let x = 0; x <= 2; x += 1) {
        if (String(value).indexOf(query) + 1) {
            b1 = true;
        }
    //    }
    }
    //  console.log(query, value, b1, String(value).indexOf(query));
    //                                          console.log(b1);

    return b1;
}

function pusher(arr, query) {
    for (let i = 0; i < phoneBook.length; i += 1) {
        if (checkInclude(i, query)) {
            arr.push(phoneBook[i]);
        }
    }

    return arr;
}

function joiner(foundResults, res) {
    for (let i = 0; i < foundResults.length; i += 1) {
        var a1 = foundResults[i].p.slice(0, 3);
        var a2 = foundResults[i].p.slice(3, 6);
        var a3 = foundResults[i].p.slice(6, 8);
        var a4 = foundResults[i].p.slice(8);
        var phoneQ = '+7 (' + a1 + ') ' + a2 + '-' + a3 + '-' + a4;
        var join = foundResults[i].n + ', ' + phoneQ;
        if (foundResults[i].m) {
            join += ', ' + foundResults[i].m;
        }
        res.push(join);
    }
    res.sort();

    return res;
}

/*
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function (query) {
    var foundResults = [];
    if (typeof(query) !== 'string') {
        return foundResults;
    }
    switch (query) {
        case '*':
            foundResults = phoneBook;
            break;
        case '':

            return foundResults;
        default:
            foundResults = pusher(foundResults, query);
    }

    var res = [];
    //  console.log(foundResults.length);
    res = joiner(foundResults, res);
    //                                          console.log(phoneBook, 'find');

    return res;

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
    var sep = [];
    var total = 0;
    sep = csv.split('\n');
    for (var notes of sep) {
        var note = notes.split(';');
        if (exports.update (note[1], note[0], note[2]) || exports.add (note[1], note[0], note[2])) {
            total++;
        }
    }
    //  console.log(phoneBook);
    //  console.log(total);

    return total;
};
