'use strict'

const User = require('../../../models/user')
const ResponseError = require('../../../error-handlers/response-error')

function confirmAUser(token) {
    return new Promise((resolve, reject) => {
        User.findOne({ confirmation_token: token }, function (err, user) {
            if (err) {
                return reject(new ResponseError(err.message))
            }

            if (user === null) {
                return reject(new ResponseError('Invalid Token', 422))
            }

            if (user.confirmed) {
                return resolve(user)
            }

            user.confirmed = true

            user.save(function (_err, updatedUser) {
                if (_err) {
                    return reject(new ResponseError(_err.message))
                }

                resolve(updatedUser)
            })
            
        })
    })
}

module.exports = confirmAUser
