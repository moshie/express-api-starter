"use strict";

const getRoleByName = require('../helpers/get-role-by-name');
const removeUserRole = require('../helpers/remove-user-role');
const findUserById = require('../../users/helpers/get-user-by-id');

function revokeRolefromUsers(role_name, users = []) {

    return getRoleByName(role_name)
        .then(role => Promise.all(
            users.map(id => {
                return findUserById(id)
                    .then(user => removeUserRole(role, user))
            })
        ));

}

module.exports = revokeRolefromUsers;
