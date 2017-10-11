'use strict';

var phoneBook = require('./phone-book');

console.info(phoneBook.add('1112223344', 'Андрей', 'a@a.ru'));
console.info(phoneBook.add('0987654321', 'Андрей 367f.adраор', 'a@a.org'));
console.info(phoneBook.add('1112225566', 'Сергей', 'b@a.ru'));
console.info(phoneBook.add('1112225566', 'Георгий', 'b@a.ru'));
console.info(phoneBook.add('1234567890', 'Илья'));
console.info(phoneBook.add('1234567899', ''));
console.info(phoneBook.update('1234567899', 'Андрей'));
console.info(phoneBook.update('1112225566', 'Андрей', 'b@b.com'));
console.info(phoneBook.find('*'));
let symbol = '';
console.info(phoneBook.findAndRemove(symbol));
console.info(phoneBook.findAndRemove('Андрей'));
console.info(phoneBook.find('*'));
let csv = [
    'Алексей;1112223344;alex@alex.alex',
    'Алексей;1112223355;alex@alex.alex',
    'Урод;1112223356;',
    'СтранныйD;111222335a;',
    'sdfs564fscwei7y8seugycjwegf376r7wredu6yn3b f3ygweufy7trf43u6rgtfu37;9221203680;',
    'adasdsad;1111111111;email;someshit;anothershit'
].join('\n');
console.info(phoneBook.importFromCsv(csv));
console.info(phoneBook.find('*'));
// // Эти записи добавятся, вернется true
// // phoneBook.add('5554440044', 'Григорий', 'grisha@example.com');
// phoneBook.add('5552220022', 'Борис', 'boris@example.com');
// phoneBook.add('5551110011', 'Алекс');
// phoneBook.add('5553330033', 'Валерий', 'valera@example.com');
//
// // Эти запись не добавятся
// phoneBook.add('3330033', 'Неизвестный', 'unknown@example.com');
// phoneBook.add('5551110011', 'Алексей');
// phoneBook.add('5555550055');
// // console.info(phoneBook.add('123456789', 'Wrong', 'wrong@name.com'));
//
// // Обновление
// phoneBook.update('5551110011', 'Алексей', 'alex@example.com');
// phoneBook.update('5553330033', 'Валерий');
// phoneBook.update('5553330033', 'Name', 'mail@mail.mail');
// phoneBook.update('5553330033', 'Name Surname', '');
//
// // В следующих примерах вернутся все записи
// // phoneBook.print();
// // console.info(phoneBook.find(''));
// // console.info(phoneBook.find('555'));
// // console.info(phoneBook.find('u'));
// // console.info(phoneBook.find('0'));
// // console.info(phoneBook.find(''));
// // console.info(phoneBook.find(' '));
// // console.info(phoneBook.find('  '));
// // console.info(phoneBook.find());
// // console.info(phoneBook.find(null));
// // Вывод будет следующий
// // [
// //   'Алексей, +7 (555) 111-00-11, alex@example.com',
// //   'Борис, +7 (555) 222-00-22, boris@example.com',
// //   'Валерий, +7 (555) 333-00-33',
// //   'Григорий, +7 (555) 444-00-44, grisha@example.com'
// // ]
//
// // phoneBook.print();
// // // // Удаление
// // console.info(phoneBook.findAndRemove('.')); // returns 3
// // phoneBook.print();
// console.info(phoneBook.findAndRemove('*')); // returns 3
// phoneBook.print();
//
// if (phoneBook.isStar) {
//     // Импортируем из csv
//     var csv = [
//         // 'Борис;5552220022;boris@example.com',
//         // 'Григорий;5554440044;grisha@example.com',
//         // 'Алексей;5551110011;alex@example.com',
//         // 'Валерий;5553330033;valera@example.com',
//         // 'Неизвестный;3330033;unknown@example.com',
//         // 'Name;+123456789;email',
//         // 'Namename;1234567890;',
//         // 'Namename;1234567891',
//         // '1234567890;Wrong',
//         // ';1234567899'
//         ''
//     ].join('\n');
//     console.info(phoneBook.importFromCsv(csv)); // returns 4
// }
// phoneBook.print();
// console.info(phoneBook.find('*'));
