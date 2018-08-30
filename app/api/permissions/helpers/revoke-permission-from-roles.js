'use strict'

const getPermissionByName = require('../helpers/get-permission-by-name')
const removePermissionFromRole = require('../helpers/remove-permission-from-role')
const getRoleByName = require('../../roles/helpers/get-role-by-name')

function revokePermissionFromRoles(permission_name, roles = []) {

    return getPermissionByName(permission_name)
        .then(permission => Promise.all(
            roles.map(role => {
                return getRoleByName(role)
                    .then(role => removePermissionFromRole(permission, role))
            })
        ))

}

module.exports = revokePermissionFromRoles
