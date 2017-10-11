'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;

/**
 * Телефонная книга
 */
var phoneBook = {};
function checkPhone(phone) {
    if (phone.match(/\d/g).length === 10) {
        return true;
    }
    
    return false;
}
function checkName(name) {
    if (typeof(name) === 'string' && name !== '') {
        return true;
    }
    
    return false;
}
function normalizePhone(phone) {
    var firstPart = phone[0] + phone[1] + phone[2];
    var secondPart = phone[3] + phone[4] + phone[5] + '-' + phone[6];
    secondPart = secondPart  + phone[7] + '-' + phone[8] + phone[9];
    
    return '+7 ' + '(' + firstPart + ') ' + secondPart;       
}    
function getNotesStruct(foundNames, foundNotes, result) {
    var anotherName;
    var anotherPhone;
    var anotherMail;
    for(var i = 0; i < foundNames.length(); i++) {
        anotherName = foundNames[i]
        anotherPhone = normalizePhone(foundNotes[anotherName][0]);
        anotherMail = foundNotes[anotherName][1];
        result.push([anotherName + ', ' + anotherPhone + ', ' + anotherMail]);
    }
    
    return result;
}
function getNotes(query) {
    var result = [];
    var allNumbers = Object.keys(phoneBook);
    var foundNames = [];
    var foundNotes = {};
    var foundName = '';
    var foundMail = '';
    for(var i = 0; i < allNumbers.length; i++) {
        foundName = phoneBook[allNumbers[i]][0];
        foundMail = phoneBook[allNumbers[i]][1];
        if (query === '*' || allNumbers[i].includes(query) || foundName.includes(query) || foundMail.includes(query)) {
            foundNames.push(foundName);
            foundNotes[foundName] = [allNumbers[i],foundMail];
        }
    }
    foundNames.sort();
    result = getNotesStruct(foundNames, foundNotes, result);
    
    return result;
}
/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.add = function (phone, name, email) {
    if(checkPhone(phone) && checkName(name)) {
        if(!Object.keys(phoneBook).includes(phone)) {
            phoneBook[phone] = [name, email];
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
exports.update = function (phone, name, email) {
    if(checkPhone(phone) && checkName(name)) {
            if(phoneBook[phone] != undefined) {
            phoneBook[phone] = [name, email];
                
            return true;
        }
    }
    
    return false;
};

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
exports.findAndRemove = function (query) {
    var foundNotes = getNotes(query);
    for(var i = 0; i < foundNotes.length; i++) {
        delete phoneBook[foundNotes[i][1]];
    }
    
    return foundNotes.length;
};

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function (query) {
    if(typeof(query) === 'string') {
        return getNotes(query);
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

    return csv.split('\n').length;
};
