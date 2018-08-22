"use strict";

const getPermissionByName = require('./get-permission-by-name');
const updatePermissionRoles = require('./update-roles-permission');
const getRoleByName = require('../../users/helpers/get-role-by-name');

function savePermissionToRoles(permission_name, roles = []) {

    return getPermissionByName(permission_name)
        .then(permission => Promise.all(
            roles.map(name => {
                return getRoleByName(name)
                    .then(role => updatePermissionRoles(permission, role))
            })
        ));

}

module.exports = savePermissionToRoles;
