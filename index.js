'use strict';

var phoneBook = require('./phone-book');

// Эти записи добавятся, вернется true
console.log('add +');
console.info(phoneBook.add('5562220022', 'Григорий', 'grisha@example.com'));//T
console.info(phoneBook.add('5552220022', 'Борис', 'boris@example.com'));//T
console.info(phoneBook.add('jhgkhgf', 'Григорий', 'grisha@example.com'));//F
console.info(phoneBook.add('115552220022', 'Борис', 'boris@example.com'));//F
console.info(phoneBook.add('5110011', 'Алекс'));//F
console.info(phoneBook.add('5551110011', 'Алексей'));//t
// console.info(phoneBook.add(, , 'valera@example.com'));//F
console.info(phoneBook.add('', 'Валерий1', 'valera@example.com'));//F
console.info(phoneBook.add('5553330033', 'Валерий', null));//t


// Эти запись не добавятся
console.log('add -');
console.info(phoneBook.add('3330033', 'Неизвестный', 'unknown@example.com'));//F
console.info(phoneBook.add('5551110011', 'Алексей'));//f
console.info(phoneBook.add('5555550055'));//F

// Обновление
console.log('up +');
console.info(phoneBook.update('5551110011', 'Алексей', 'alex@example.com'));//T
console.info(phoneBook.update('5553330033', '', 'alex111@example.com'));//F
console.info(phoneBook.update('5553330033', 'Валерий'));//T

// В следующих примерах вернутся все записи
console.log('FIND');
console.info(phoneBook.find('*'));
console.info(phoneBook.find('555'));
console.info(phoneBook.find(''));
console.info(phoneBook.find(null));
console.info(phoneBook.find(undefined));
// Вывод будет следующий
// [
//   'Алексей, +7 (555) 111-00-11, alex@example.com',
//   'Борис, +7 (555) 222-00-22, boris@example.com',
//   'Валерий, +7 (555) 333-00-33',
//   'Григорий, +7 (555) 444-00-44, grisha@example.com'
// ]

// Удаление
console.log('DELETE');
console.info(phoneBook.find('*'));
console.info(phoneBook.findAndRemove('Валерий'));//1
phoneBook.add('4562220022', 'Бориска', 'boris@example.com');
console.info(phoneBook.find('*'));
console.info(phoneBook.findAndRemove('рис'));//2
//console.info(phoneBook.findAndRemove('@')); //2
console.info(phoneBook.find('*'));
console.info(phoneBook.findAndRemove('*'));//2
console.info(phoneBook.find('*'));

if (phoneBook.isStar) {
    // Импортируем из csv
    var csv = [
        'Борис;5552220022;boris@example.com',
        'Григорий;5554440044;grisha@example.com',
        'Алексей;5551110011;alex@example.com',
        'Валерий;5553330033;valera@example.com',
        'Неизвестный;3330033;unknown@example.com'
    ].join('\n');
    phoneBook.importFromCsv(csv); // returns 4
}
