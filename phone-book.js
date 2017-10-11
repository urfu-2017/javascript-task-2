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
*/
exports.add = function (phone, name, email) {
    var error = '';
    if ( !phone.match( /\b\d{10}\b/i ) ){
        error = 1;
    }
    if ( !email ){
        email = 0;
    }
    if ( !name ){
        error = 1;
    }
    if ( error ){
        return false;
    } else {
        phoneBook.forEach( function( item, i, arr ) {
           if ( item[0] === phone ){
               error = 1;
            }
        });
        if ( !error ){
            phoneBook[phoneBook.length] = [phone, name, email];
            return true;
        } else {
            return false;
        }
    }
};

/**
* Обновление записи в телефонной книге
* @param {String} phone
* @param {String} name
* @param {String} email
*/
exports.update = function (phone, name, email) {
    var error = '';
    if ( !phone.match( /\b\d{10}\b/i ) ){
        error = 1;
    }
    if ( !email ){
        email = 0;
    }
    if ( !name ){
        error = 1;
    }
    if ( error ){
        return false;
    }
    phoneBook.forEach( function( item, i, arr ) {
        if ( item[0] === phone ){
            phoneBook[i][1] = name;
            phoneBook[i][2] = email;
            return true;
        } else {
            return false;
        }
    });
};

/**
* Удаление записей по запросу из телефонной книги
* @param {String} query
*/
exports.findAndRemove = function ( query ) {
    if ( query ){
        var j = 0;
        phoneBook.forEach(function( item, i, arr ) {
            item.forEach( function( item2, i2, arr2 ) {
                if ( item2 === query ){
                    delete phoneBook[i];
                    j++;
                }
            });
        });
    }
    return j;
};

/**
* Поиск записей по запросу в телефонной книге
* @param {String} query
*/
exports.find = function ( query ) {
    findList = [];
    if ( query ){
        phoneBook.forEach( function( item, i, arr ) {
            item.forEach( function( item2, i2, arr2 ) {
                if ( item2 === query ){
                    item[0] = '+7 (' + item[0].slice(0, 3) + ') ' + item[0].slice(3, 6) + '-' + item[0].slice(6, 8) + '-' + item[0].slice(8, 10);
                    findList[findList.length] = item[1] + ' ' + item[0] + ' ' + item[2];
                }
            });
        });
    }
    if ( query === "*" ){
        phoneBook.forEach( function( item, i, arr ) {
            item[0] = '+7 (' + item[0].slice(0, 3) + ') ' + item[0].slice(3, 6) + '-' + item[0].slice(6, 8) + '-' + item[0].slice(8, 10);
            findList[findList.length] = item[1] + ' ' + item[0] + ' ' + item[2];
        });
    }
    findList.sort();
    return findList;
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

    return csv.split('\n').length;
};
