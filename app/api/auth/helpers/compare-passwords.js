'use strict'

const bcrypt = require('bcrypt')
const ResponseError = require('../../../error-handlers/response-error')

function comparePasswords (user, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, function (err, response) {
            if (err) {
                return reject(new ResponseError(err.message))
            }

            if (response === false) {
                return reject(new ResponseError('Unauthorized', 401))
            }

            resolve(user)
        })
    })
}

module.exports = comparePasswords
