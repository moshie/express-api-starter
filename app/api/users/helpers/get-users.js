'use strict'

const User = require('../../../models/user')
const ResponseException = require('../../../exceptions/response')

function getUsers() {
    return new Promise((resolve, reject) => {
        User.find({}, function (err, users) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            resolve(users)
        })
    })
}

module.exports = getUsers
