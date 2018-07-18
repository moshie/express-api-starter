"use strict";

function hasRoles(usersRoles, roles) {
    var hasRole = false;

    for (let i = 0; i < roles.length; i++) {
        if (usersRoles.indexOf(role[i]) !== -1) {
            hasRole = true;
        }
    }

    return hasRole;
}

module.exports = hasRoles;
