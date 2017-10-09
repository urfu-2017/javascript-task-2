'use strict';

exports.isStar = true;

const phoneBook = new Map();
const PHONE_PATTERN = /^(\d{3})(\d{3})(\d{2})(\d{2})$/;

const format = phone => phone.replace(PHONE_PATTERN, (match, ...groups) =>
    `+7 (${groups[0]}) ${groups[1]}-${groups[2]}-${groups[3]}`);

const search = query => query ? Array.from(phoneBook.entries()).filter(([phone, { name, email }]) =>
    query === '*' || (phone + name + email).includes(query)) : [];

exports.add = (phone, name, email = '') => name && PHONE_PATTERN.test(phone) &&
    !phoneBook.has(phone) && phoneBook.set(phone, { name, email }) && true;
exports.update = (phone, name, email = '') => name && phoneBook.has(phone) &&
    phoneBook.set(phone, { name, email }) && true;
exports.findAndRemove = query => search(query).filter(([phone]) =>
    phoneBook.delete(phone)).length;
exports.find = query => search(query).sort(([, a], [, b]) => a.name.localeCompare(b.name))
    .map(([phone, { name, email }]) => `${name}, ${format(phone)}${email ? `, ${email}` : ''}`);
exports.importFromCsv = csv => csv.split('\n').filter(line => {
    const [name, phone, email] = line.split(';');

    return exports.add(phone, name, email) || exports.update(phone, name, email);
}).length;
