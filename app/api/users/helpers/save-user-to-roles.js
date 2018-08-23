"use strict";

const getUserById = require('./get-user-by-id');
const updateUserRole = require('../../roles/helpers/update-user-role');
const getUserById = require('./get-user-by-id');

function saveUserToRoles(user_id, roles = []) {

    return getUserById(user_id)
        .then(user => Promise.all(
            roles.map(roleName => {
                return getRoleByName(roleName)
                    .then(role => updateUserRole(role, user))
            })
        ));

}

module.exports = saveUserToRoles;
