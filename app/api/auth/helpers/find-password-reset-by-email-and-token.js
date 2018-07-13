"use strict";

const PasswordResets = require('../../../models/password-resets');
const ResponseError = require('../../../error-handlers/response-error');

function findPasswordResetByEmailAndToken(email, token) {
    return new Promise((resolve, reject) => {
        PasswordResets.findOne({ email, token }, function (err, doc) {
            if (err) {
                return reject(new ResponseError(err.message));
            }

            if (doc === null) {
                return reject(new ResponseError('Invalid Token', 422));
            }

            resolve(doc);
        });
    });
}

module.exports = findPasswordResetByEmailAndToken;
