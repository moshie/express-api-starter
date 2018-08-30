'use strict'

const getPermissionByName = require('./get-permission-by-name')
const addPermissionToRole = require('./add-permission-to-role')
const getRoleByName = require('../../roles/helpers/get-role-by-name')

function savePermissionToRoles(permission_name, roles = []) {

    return getPermissionByName(permission_name)
        .then(permission => Promise.all(
            roles.map(name => {
                return getRoleByName(name)
                    .then(role => addPermissionToRole(permission, role))
            })
        ))

}

module.exports = savePermissionToRoles
