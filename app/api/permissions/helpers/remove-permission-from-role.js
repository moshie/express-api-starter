"use strict";

const ResponseError = require('../../../error-handlers/response-error');
const roleHasPermission = require('./role-has-permission');

function removePermissionFromRole(permission, role) {
    return new Promise((resolve, reject) => {

        if (!roleHasPermission(roles.permissions, [permission.name])) {
            // Role already has that permission
            return resolve(role);
        }

        role.permissions = role.permissions.filter(p => !permission._id.equals(p._id));

        role.save(function (err, savedRole) {
            if (err) {
                return reject(new ResponseError(err.message));
            }

            resolve(savedRole);
        });
    })
}

module.exports = removePermissionFromRole;
