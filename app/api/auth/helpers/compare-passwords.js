'use strict'

const bcrypt = require('bcrypt')
const ResponseException = require('../../../exceptions/response')

function comparePasswords (user, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, function (err, response) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            if (response === false) {
                return reject(new ResponseException('Unauthorized', 401))
            }

            resolve(user)
        })
    })
}

module.exports = comparePasswords
