'use strict'

const ResponseException = require('../../../exceptions/response')

function resetUserPassword([user, password]) {
    return new Promise((resolve, reject) => {

        user.password = password

        user.save(function (err, updatedUser) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            resolve(updatedUser)
        })
    })
}

module.exports = resetUserPassword
