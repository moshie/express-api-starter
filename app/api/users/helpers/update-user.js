'use strict'

const User = require('../../../models/user')
const ResponseException = require('../../../exceptions/response')

function updateUser(id, updatedUser) {
    return new Promise((resolve, reject) => {
        User.updateOne({ _id: id }, updatedUser, function (err, user) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            if (user === null) {
                return reject(new ResponseException('User not found', 404))
            }

            resolve(user)
        })
    })
}

module.exports = updateUser
