"use strict";

const PasswordResets = require('../../../models/password-resets');
const ResponseError = require('../../../error-handlers/response-error');

function deletePasswordResetEntry(user) {
    return new Promise((resolve, reject) => {
        PasswordResets.deleteOne({ email: user.email }, function (err) {
            if (err) {
                return reject(new ResponseError(err.message));
            }

            resolve(user);
        });
    });
}

module.exports = deletePasswordResetEntry;
