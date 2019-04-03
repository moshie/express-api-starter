'use strict'

const ResponseException = require('../../../exceptions/response')
const hasRoles = require('./has-roles')

function removeUserRole(role, user) {
    return new Promise((resolve, reject) => {

        if (!hasRoles(user.roles, [role.name])) {
            // User doesn't have that role
            return resolve(user)
        }

        user.roles = user.roles.filter(r => !role._id.equals(r._id))

        user.save(function (err, savedUser) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            resolve(savedUser)
        })
    })
}

module.exports = removeUserRole
