"use strict";

const ResponseError = require('../../../error-handlers/response-error');

function resetUserPassword([user, password]) {
    return new Promise((resolve, reject) => {

        user.password = password;

        user.save(function (err, updatedUser) {
            if (err) {
                return reject(new ResponseError(err.message));
            }

            resolve(updatedUser);
        });
    });
}

module.exports = resetUserPassword;
