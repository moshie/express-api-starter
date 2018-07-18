"use strict";

const User = require('../../../models/user');
const ResponseError = require('../../../error-handlers/response-error');

function findUserByEmail (email) {
    return new Promise((resolve, reject) => {
        User.findOne({ email })
            .populate('roles')
            .exec(function (err, user) {
                if (err) {
                    return reject(new ResponseError(err.message));
                }

                if (user === null) {
                    return reject(new ResponseError('User Not Found', 404));
                }

                resolve(user);
            });
    });
}

module.exports = findUserByEmail;
