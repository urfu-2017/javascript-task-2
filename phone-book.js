'use strict';
/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;
/**
 * Телефонная книга
 */
var phoneBook;
/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.add = function(phone, name, email) {
	phone = String(phone);
	if (name === '' || (phone.length !== 10 && phone.length !== 0)) return false;
	if (phone === undefined) phone = '';
	if (email === undefined) email = '';
	for (i = 0; i < phoneBook.length; i++) {
		if (phoneBook[i].name === name || phoneBook[i].phone === phone || phoneBook[i].email === email) return false;
	}
	phoneBook.push({
		name: name,
		phone: phone,
		email: email
	});
	return true;
};
/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} email
 */
exports.update = function(phone, name, email) {
	phone = String(phone);
	if (phone.length !== 10 && phone.length !== 0) return false;
	if (name === undefined) name = '';
	if (email === undefined) email = '';
	for (i = 0; i < phoneBook.length; i++) {
		if (phoneBook[i].phone === phone) {
			phoneBook[i].name = name;
			phoneBook[i].email = email;
			return true;
		}
	}
	return false;
};
/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 */
exports.findAndRemove = function(query) {
	if (query === '') return undefined;
	var schet = 0;
	for (i = phoneBook.length - 1; i >= 0; i--) {
		if (phoneBook[i].name.indexOf(query) !== -1 || phoneBook[i].phone.indexOf(query) !== -1 || phoneBook[i].email.indexOf(query) !== -1) {
			phoneBook.splice(i, i + 1);
			schet += 1;
		}
	}
	return schet;
};
/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 */
exports.find = function(query) {
	if (query === '') return undefined;
	var exit = [];
	for (i = 0; i < phoneBook.length; i++) {
		if (phoneBook[i].name.indexOf(query) !== -1 || phoneBook[i].phone.indexOf(query) !== -1 || phoneBook[i].email.indexOf(query) !== -1 || query === '*') {
			exit.push(phoneBook[i].name + ', +7 (' + phoneBook[i].phone.slice(0, 3) + ') ' + phoneBook[i].phone.slice(3, 6) + '-' + phoneBook[i].phone.slice(6, 8) + '-' + phoneBook[i].phone.slice(8, 10) + ', ' + phoneBook[i].email)
		}
	}
	exit.sort();
	return exit;
};
/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
exports.importFromCsv = function(csv) {
		var schet = 0;
		var name1;
		var phone1;
		var email1;;
		csv1 = csv1.split('\n');
		for (i = 0; i < csv1.length; i++) {
			name1 = csv1[i].slice(0, csv1[i].indexOf(';'));
			phone1 = csv1[i].slice(csv1[i].indexOf(';') + 1, csv1[i].lastIndexOf(';'));
			email1 = csv1[i].slice(csv1[i].lastIndexOf(';') + 1, csv1[i].length);
			if (add(phone1, name1, email1)) {
				schet += 1;
			}
			if (upd(phone1, name1, email1)) {
				schet += 1;
			}
		}
		return schet
	}
	// Парсим csv
	// Добавляем в телефонную книгу
	// Либо обновляем, если запись с таким телефоном уже существует
return csv.split('\n').length;{
};
