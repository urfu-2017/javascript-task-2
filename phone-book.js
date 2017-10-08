'use strict';

exports.isStar = true;

const format = phone => '+7 (' + phone.substring(0, 3) + ') ' +
    phone.substring(3, 6) + '-' + phone.substring(6, 8) + '-' + phone.substring(8, 10);

const BOOK = {
    data: new Map(),
    validate: (entry, accept) => {
        return accept(
            /^\d{10}$/.test(entry.phone) && typeof(entry.name) === 'string' && Boolean(entry.name)
        );
    },
    put: (entry, update) => BOOK.validate(entry, (isValid) => {
        let hasPhone = BOOK.data.has(entry.phone);
        let acceptSet = isValid && (!hasPhone || update) && (hasPhone || !update);
        if (acceptSet) {
            BOOK.data.set(entry.phone, { name: entry.name, email: entry.email });
        }

        return acceptSet;
    }),
    find: (query, remove) => {
        let result = [];
        BOOK.data.forEach((entry, number) => {
            if (((number + entry.name + entry.email).includes(query) || query === '*') && query) {
                result.push(entry.name + ', ' + format(number) +
                    ((entry.email === undefined) ? '' : ', ' + entry.email)
                );

                if (remove) {
                    BOOK.data.delete(number);
                }
            }
        });

        return result.sort();
    }
};

exports.add = (p, n, e) => BOOK.put({ phone: p, name: n, email: e }, false);
exports.update = (p, n, e) => BOOK.put({ phone: p, name: n, email: e }, true);
exports.find = query => BOOK.find(query, false);
exports.findAndRemove = query => BOOK.find(query, true).length;
exports.importFromCsv = csv => csv.split('\n').filter(line => {
    const [n, p, e] = line.split(';');

    return exports.add(p, n, e) || exports.update(p, n, e);
}).length;
