"use strict";

const getRoleByName = require('../helpers/get-role-by-name');
const updateUserRole = require('../helpers/update-user-role');
const getUserById = require('../../users/helpers/get-user-by-id');

function saveRoleToUsers(role_name, users = []) {

    return getRoleByName(role_name)
        .then(role => Promise.all(
            users.map(id => {
                return getUserById(id)
                    .then(user => updateUserRole(role, user))
            })
        ));

}

module.exports = saveRoleToUsers;
