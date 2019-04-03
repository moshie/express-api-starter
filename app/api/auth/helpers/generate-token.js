'use strict'

const crypto = require('crypto')
const ResponseException = require('../../../exceptions/response')

function generateToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(12, function (err, buffer) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            resolve(buffer.toString('hex'))
        })
    })
}

module.exports = generateToken
