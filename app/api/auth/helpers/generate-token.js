'use strict'

const crypto = require('crypto')
const ResponseError = require('../../../error-handlers/response-error')

function generateToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(12, function (err, buffer) {
            if (err) {
                return reject(new ResponseError(err.message))
            }

            resolve(buffer.toString('hex'))
        })
    })
}

module.exports = generateToken
