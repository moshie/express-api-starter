'use strict'

const User = require('../../../models/user')
const ResponseError = require('../../../error-handlers/response-error')

function getUsers() {
    return new Promise((resolve, reject) => {
        User.find({}, function (err, users) {
            if (err) {
                return reject(new ResponseError(err.message))
            }

            resolve(users)
        })
    })
}

module.exports = getUsers
