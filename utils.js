'use strict';


exports.isNullOrUndefined = function (value) {
    return value === null || value === undefined;
};

//  +7 (555) 666-77-88
function formatPhone(s) {
    let code = s.slice(0, 3);
    let g1 = s.slice(3, 6);
    let g2 = s.slice(6, 8);
    let g3 = s.slice(8, 10);

    return `+7 (${code}) ${g1}-${g2}-${g3}`;
}


exports.formatPhoneEntry = function (x) {
    let nameAndPhone = `${x.name}, ${formatPhone(x.phone)}`;

    return x.email
        ? nameAndPhone + `, ${x.email}`
        : nameAndPhone;
};
