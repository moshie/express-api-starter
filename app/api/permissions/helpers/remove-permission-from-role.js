'use strict'

const ResponseException = require('../../../exceptions/response')
const roleHasPermission = require('./role-has-permissions')

function removePermissionFromRole(permission, role) {
    return new Promise((resolve, reject) => {

        if (!roleHasPermission(role.permissions, [permission.name])) {
            // Role already has that permission
            return resolve(role)
        }

        role.permissions = role.permissions.filter(p => !permission._id.equals(p._id))

        role.save(function (err, savedRole) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            resolve(savedRole)
        })
    })
}

module.exports = removePermissionFromRole
