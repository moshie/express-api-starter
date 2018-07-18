"use strict";

const getRoleByName = require('../helpers/get-role-by-name');
const updateUserRole = require('../helpers/update-user-role');
const findUserByEmail = require('../../auth/helpers/find-user-by-email');

function saveRoleToUsers(role_name, users = []) {

    return getRoleByName(role_name)
        .then(role => Promise.all(
            users.map(email => {
                return findUserByEmail(email)
                    .then(user => updateUserRole(role, user))
            })
        ));

}

module.exports = saveRoleToUsers;
