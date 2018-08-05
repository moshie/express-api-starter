"use strict";

const getRoleByName = require('../helpers/get-role-by-name');
const removeUserRole = require('../helpers/remove-user-role');
const findUserByEmail = require('../../auth/helpers/find-user-by-email');

function revokeRolefromUsers(role_name, users = []) {

    return getRoleByName(role_name)
        .then(role => Promise.all(
            users.map(email => {
                return findUserByEmail(email)
                    .then(user => removeUserRole(role, user))
            })
        ));

}

module.exports = revokeRolefromUsers;
