/* eslint-env mocha */
'use strict';

var assert = require('assert');

var phoneBook = require('./phone-book');

describe('phone-book', function () {
    it('должен добавлять записи', function () {
        assert.ok(phoneBook.add('5554440044', 'Григорий', 'grisha@example.com'));
        assert.ok(phoneBook.add('5552220022', 'Борис', 'boris@example.com'));
        assert.ok(phoneBook.add('5551110011', 'Алекс'));
        assert.ok(phoneBook.add('5553330033', 'Валерий', 'valera@example.com'));
    });

    it('не должен добавлять неправильные записи', function () {
        assert.ok(!phoneBook.add('3330033', 'Неизвестный', 'unknown@example.com'));
        assert.ok(!phoneBook.add('5551110011', 'Алексей'));
        assert.ok(!phoneBook.add('5555550055'));
        assert.ok(!phoneBook.add('f553330033', 'Валерий', 'valera@example.com'));
        assert.ok(!phoneBook.add('5555550055', ''));
    });

    it('должен обновлять существующие записи', function () {
        assert.ok(phoneBook.update('5551110011', 'Алексей', 'alex@example.com'));
        assert.ok(phoneBook.update('5553330033', 'Валерий'));
    });

    it('должен искать все записи по запросу "*"', function () {
        assert.deepStrictEqual(phoneBook.find('*'), [
            'Алексей, +7 (555) 111-00-11, alex@example.com',
            'Борис, +7 (555) 222-00-22, boris@example.com',
            'Валерий, +7 (555) 333-00-33',
            'Григорий, +7 (555) 444-00-44, grisha@example.com'
        ]);
    });

    it('ничего не выводит по пустому запросу', function () {
        assert.deepStrictEqual(phoneBook.find(), [
        ]);
    });

    it('должен искать все записи по запросу "555"', function () {
        assert.deepStrictEqual(phoneBook.find('555'), [
            'Алексей, +7 (555) 111-00-11, alex@example.com',
            'Борис, +7 (555) 222-00-22, boris@example.com',
            'Валерий, +7 (555) 333-00-33',
            'Григорий, +7 (555) 444-00-44, grisha@example.com'
        ]);
    });

    it('запрос ","', function () {
        assert.deepStrictEqual(phoneBook.find(','), [
        ]);
    });

    it('должен искать следующие записи по запросу "о"', function () {
        assert.deepStrictEqual(phoneBook.find('о'), [
            'Борис, +7 (555) 222-00-22, boris@example.com',
            'Григорий, +7 (555) 444-00-44, grisha@example.com'
        ]);
    });

    it('не должен ничего удалять по пустому запросу', function () {
        assert.strictEqual(phoneBook.findAndRemove(''), 0);
    });

    it('должен удалять элементы из телефонной книги', function () {
        assert.strictEqual(phoneBook.findAndRemove('a@'), 1);
    });

    it('не должен ничего удалять по пустому запросу', function () {
        assert.strictEqual(phoneBook.findAndRemove(''), 0);
    });

    it('должен удалять все по запросу звездочка', function () {
        assert.strictEqual(phoneBook.findAndRemove('*'), 3);
    });

    if (phoneBook.isStar) {
        it('должен экспортировать из cvs', function () {
            var csv = [
                'Борис;5552220022;boris@example.com',
                'Григорий;5554440044;grisha@example.com',
                'Алексей;5551110011;alex@example.com',
                'Валерий;5553330033;valera@example.com',
                'Неизвестный;3330033;unknown@example.com'
            ].join('\n');
            assert.strictEqual(phoneBook.importFromCsv(csv), 4);
        });
    }
});
