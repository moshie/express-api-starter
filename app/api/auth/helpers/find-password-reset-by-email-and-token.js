'use strict'

const PasswordResets = require('../../../models/password-resets')
const ResponseException = require('../../../exceptions/response')

function findPasswordResetByEmailAndToken(email, token) {
    return new Promise((resolve, reject) => {
        PasswordResets.findOne({ email, token }, function (err, doc) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            if (doc === null) {
                return reject(new ResponseException('Invalid Token', 422))
            }

            resolve(doc)
        })
    })
}

module.exports = findPasswordResetByEmailAndToken
