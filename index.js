'use strict';

var phoneBook = require('./phone-book');

// Эти записи добавятся, вернется true
console.info(phoneBook.add('5554440044', 'Григорий', 'grisha@example.com'));
console.info(phoneBook.add('5552220022', 'Борис', 'bori$s@example.com'));
console.info(phoneBook.add('555534555555005543534534', 'Cookie'));

// console.info(phoneBook.add('5551110011', 'Алекс'));
// console.info(phoneBook.add('5553333332', 'Михаил', 'Misha@example.com'));
// console.info(phoneBook.add('5553330033', 'Валерий', 'valera@example.com'));
// console.info(phoneBook.add('5553333333', 'Валерий', 'valerii@example.com'));
// console.info(phoneBook.add('5553333331', 'Яков', 'Yakov@example.com'));

// // Эти запись не добавятся
// phoneBook.add('3330033', 'Неизвестный', 'unknown@example.com');
// phoneBook.add('5551110011', 'Алексей');
// phoneBook.add('5555550055');

// console.info(phoneBook.add('8800110011', '', 'alex@example.com'));
// console.info(phoneBook.add('3330033', 'Неизвестный', 'unknown@example.com'));
// console.info(phoneBook.add('5551110011', 'Алексей'));
// console.info(phoneBook.add('5555550055'));
// console.info(phoneBook.add('5553333333', 'Валерий', 'valerii@example.com'));


// Обновление
// console.info(phoneBook.update('5551110011', 'Леха', 'alex@example.com'));
// console.info(phoneBook.update('5553330033', 'Валерий'));
// console.info(phoneBook.update('5553332233', undefined, 'withoutName@example.com'));
// console.info(phoneBook.update('5553332233', ' ', 'withoutName@example.com'));
// console.info(phoneBook.update('5553332233', '     ', 'withoutName@example.com'));

// пустой
// console.info(phoneBook.find('kek'));
// console.info(phoneBook.find(''));
// // В следующих примерах вернутся все записи
// console.info(phoneBook.find('555'));

// console.info(phoneBook.find(''));
// console.info(phoneBook.find('*'));
// console.info(phoneBook.find('Неизвестный'));
// console.info(phoneBook.find('*'));
// console.info(phoneBook.find('5554440044'));
// // Вывод будет следующий
// // [
// //   'Алексей, +7 (555) 111-00-11, alex@example.com',
// //   'Борис, +7 (555) 222-00-22, boris@example.com',
// //   'Валерий, +7 (555) 333-00-33',
// //   'Григорий, +7 (555) 444-00-44, grisha@example.com'
// // ]

// // Удаление
console.info(phoneBook.add('5554430044', 'Григорий, кек', 'grisha@example.com'));
console.info(phoneBook.find('555'));
// console.info(phoneBook.add('9193712924', 'christina', 'christina@example.com'));
// console.info(phoneBook.findAndRemove('@'));

// if (phoneBook.isStar) {
//     // Импортируем из csv
//     var csv = [
//         'Борис;5552220022;boris@example.com',
//         'Григорий;5554440044;grisha@example.com',
//         'Алексей;5551110011;alex@example.com',
//         'Валерий;5553330033;valera@example.com',
//         'Неизвестный;3330033;unknown@example.com'
//         // '           '
//     ].join('\n');
//     console.info(phoneBook.importFromCsv(csv)); // returns 4
// }
