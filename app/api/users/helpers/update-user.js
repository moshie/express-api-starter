"use strict";

const User = require('../../../models/user');

function updateUser(email, updatedUser) {
    return new Promise((resolve, reject) => {
        User.updateOne({ email }, updatedUser, function (err, user) {
            if (err) {
                return reject(new ResponseError(err.message));
            }

            if (user === null) {
                return reject(new ResponseError('User not found', 404));
            }

            resolve(user);
        })
    })
}

module.exports = updateUser;
