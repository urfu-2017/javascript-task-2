'use strict';


const data = Symbol('data');
class Storage {
    constructor() {
        this[data] = new Set();
    }

    add(entry) {
        this[data].add(entry);
    }

    findAll(condition) {
        return Array.from(Array.from(this[data])
            .filter(condition));
    }

    find(condition) {
        return Array.from(this[data])
            .find(condition);
    }

    contains(condition) {
        return this.findAll(condition).length > 0;
    }

    remove(entry) {
        this[data].delete(entry);
    }
}

exports.Storage = Storage;

