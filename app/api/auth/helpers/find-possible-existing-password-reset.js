'use strict'

const PasswordResets = require('../../../models/password-resets')
const ResponseError = require('../../../error-handlers/response-error')

function findPossibleExistingPasswordReset(email) {
    return new Promise((resolve, reject) => {
        PasswordResets.findOne({ email }, function (err, doc) {
            if (err) {
                return reject(new ResponseError(err.message))
            }

            resolve(doc)
        })
    })
}

module.exports = findPossibleExistingPasswordReset
