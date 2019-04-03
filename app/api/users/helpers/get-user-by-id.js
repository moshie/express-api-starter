'use strict'

const User = require('../../../models/user')
const ResponseException = require('../../../exceptions/response')

function getUserById (id) {
    return new Promise((resolve, reject) => {
        User.findById(id)
            .populate('roles')
            .exec(function (err, user) {
                if (err) {
                    return reject(new ResponseException(err.message))
                }

                if (user === null) {
                    return reject(new ResponseException('User Not Found', 404))
                }

                resolve(user)
            })
    })
}

module.exports = getUserById
