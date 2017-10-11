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

exports.FullTextHandler = {
    canHandle: (query) => typeof query === 'string',
    handle: function (query, storage) {
        let entries = storage.findAll(
            entry => Object.values(entry)
                .filter(x => !isNullOrUndefined(x))
                .some(x => x.indexOf(query) >= 0));

        return Array.from(entries);
    }
};

exports.DefaultHandler = {
    canHandle: () => true,
    handle: () => []
};

exports.handlersList = [
    exports.EmptyHandler,
    exports.AsteriskHandler,
    exports.FullTextHandler,
    exports.DefaultHandler
];

