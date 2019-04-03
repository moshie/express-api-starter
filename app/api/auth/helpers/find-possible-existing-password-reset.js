'use strict'

const PasswordResets = require('../../../models/password-resets')
const ResponseException = require('../../../exceptions/response')

function findPossibleExistingPasswordReset(email) {
    return new Promise((resolve, reject) => {
        PasswordResets.findOne({ email }, function (err, doc) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            resolve(doc)
        })
    })
}

module.exports = findPossibleExistingPasswordReset
