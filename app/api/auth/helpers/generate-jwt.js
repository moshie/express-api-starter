'use strict'

const jwt = require('jsonwebtoken')
const ResponseError = require('../../../error-handlers/response-error')

function generateJWT (user) {
    return new Promise((resolve, reject) => {
        jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            user: user._id
        }, process.env.JWT_SECRET, function (err, token) {
            if (err) {
                return reject(new ResponseError(err.message))
            }

            resolve(token)
        })
    })
}

module.exports = generateJWT
