'use strict';
const { isNullOrUndefined } = require('./utils');

exports.EmptyHandler = {
    canHandle: (query) => query === '',
    handle: () => []
};

exports.AsteriskHandler = {
    canHandle: (query) => query === '*',
    handle: (query, storage) => Array.from(storage.findAll(() => true))
};

exports.AllFieldsHandler = {
    canHandle: () => true,
    handle: function (query, storage) {
        let entries = storage.findAll(
            entry => Object.values(entry)
                .filter(x => !isNullOrUndefined(x))
                .some(x => x.indexOf(query) >= 0));

        return Array.from(entries);
    }
};

