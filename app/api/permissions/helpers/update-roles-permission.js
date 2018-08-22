"use strict";

const ResponseError = require('../../../error-handlers/response-error');
const hasPermissions = require('./has-permissions');

function updateRolesPermission(permission, role) {
    return new Promise((resolve, reject) => {

        if (hasPermissions(role.permissions, [permission.name])) {
            // Role already has that permission
            return resolve(role);
        }

        role.permissions.push(permission._id);

        role.save(function (err, savedRole) {
            if (err) {
                return reject(new ResponseError(err.message));
            }

            resolve(savedRole);
        });
    })
}

module.exports = updateRolesPermission;
