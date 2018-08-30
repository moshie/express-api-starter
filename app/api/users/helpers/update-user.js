'use strict'

const User = require('../../../models/user')
const ResponseError = require('../../error-handlers/response-error')

function updateUser(id, updatedUser) {
    return new Promise((resolve, reject) => {
        User.updateOne({ _id: id }, updatedUser, function (err, user) {
            if (err) {
                return reject(new ResponseError(err.message))
            }

            if (user === null) {
                return reject(new ResponseError('User not found', 404))
            }

            resolve(user)
        })
    })
}

module.exports = updateUser
