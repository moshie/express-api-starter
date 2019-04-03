'use strict'

const PasswordResets = require('../../../models/password-resets')
const ResponseException = require('../../../exceptions/response')

function deletePasswordResetEntry(user) {
    return new Promise((resolve, reject) => {
        PasswordResets.deleteOne({ email: user.email }, function (err) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            resolve(true)
        })
    })
}

module.exports = deletePasswordResetEntry
