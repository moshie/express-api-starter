"use strict";

function roleHasPermissions(rolesPermissions, permissions) {
    var hasPermission = false;

    rolesPermissions = rolesPermissions.map(permission => permission.name);

    for (let i = 0; i < permissions.length; i++) {
        if (rolesPermissions.indexOf(permissions[i]) !== -1) {
            hasPermission = true;
            break;
        }
    }

    return hasPermission;
}

module.exports = roleHasPermissions;
