'use strict';
const { isNullOrUndefined } = require('./utils');

exports.phone = [
    phone => typeof phone === 'string',
    phone => /\d+/.test(phone),
    phone => phone.length === 10
];

exports.name = [
    (phone, name) => typeof name === 'string',
    (phone, name) => name.length > 0
];

exports.email = [
    (phone, name, email) => isNullOrUndefined(email) || typeof email === 'string',
    (phone, name, email) => isNullOrUndefined(email) || email.length > 3,
    (phone, name, email) => isNullOrUndefined(email) || /^\S+@\S+$/.test(email)
];

exports.insertDataIntegrity = [
    (phone, name, email, storage) => {
        return !storage.contains(x => Object.is(x.phone, phone));
    }
];

exports.updateDataIntegrity = [
    (phone, name, email, storage) => {
        return storage.contains(x => Object.is(x.phone, phone));
    },

    (phone, name, email, storage) => !storage.contains(
        existingEntry => existingEntry.phone === phone &&
            !isNullOrUndefined(existingEntry.name) &&
            isNullOrUndefined(name))

];

