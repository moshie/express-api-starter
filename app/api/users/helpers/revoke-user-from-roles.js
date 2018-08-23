"use strict";

const getUserById = require('../helpers/get-user-by-id');
const removeUserRole = require('../../roles/helpers/remove-user-role');
const getRoleByName = require('../../roles/helpers/get-role-by-name');

function revokeUserfromRoles(user_id, roles = []) {

    return getUserById(user_id)
        .then(user => Promise.all(
            roles.map(role => {
                return getRoleByName(role)
                    .then(role => removeUserRole(role, user))
            })
        ));

}

module.exports = revokeUserfromRoles;
