'use strict'

const PasswordResets = require('../../../models/password-resets')
const ResponseError = require('../../../error-handlers/response-error')

function updatePasswordReset(email, token, doc = null) {
    return new Promise((resolve, reject) => {

        // If reset token already exists set it as the token
        if (doc !== null) {
            doc.token = token
        }

        var passwordReset = doc === null ? new PasswordResets({ email, token }) : doc

        passwordReset.save(function (err, document) {
            if (err) {
                return reject(new ResponseError(err.message))
            }

            resolve(document)
        })
    })
}

module.exports = updatePasswordReset
