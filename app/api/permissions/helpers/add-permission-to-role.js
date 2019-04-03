'use strict'

const ResponseException = require('../../../exceptions/response')
const roleHasPermissions = require('./role-has-permissions')

function addPermissionToRole(permission, role) {
    return new Promise((resolve, reject) => {

        if (roleHasPermissions(role.permissions, [permission.name])) {
            // Role already has that permission
            return resolve(role)
        }

        role.permissions.push(permission._id)

        role.save(function (err, savedRole) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            resolve(savedRole)
        })
    })
}

module.exports = addPermissionToRole
