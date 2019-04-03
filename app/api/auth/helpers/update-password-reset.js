'use strict'

const PasswordResets = require('../../../models/password-resets')
const ResponseException = require('../../../exceptions/response')

function updatePasswordReset(email, token, doc = null) {
    return new Promise((resolve, reject) => {

        // If reset token already exists set it as the token
        if (doc !== null) {
            doc.token = token
        }

        var passwordReset = doc === null ? new PasswordResets({ email, token }) : doc

        passwordReset.save(function (err, document) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            resolve(document)
        })
    })
}

module.exports = updatePasswordReset
