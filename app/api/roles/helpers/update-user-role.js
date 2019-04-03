'use strict'

const ResponseException = require('../../../exceptions/response')
const hasRoles = require('./has-roles')

function updateUserRole(role, user) {
    return new Promise((resolve, reject) => {

        if (hasRoles(user.roles, [role.name])) {
            // User already has that role
            return resolve(user)
        }

        user.roles.push(role._id)

        user.save(function (err, savedUser) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            resolve(savedUser)
        })
    })
}

module.exports = updateUserRole
