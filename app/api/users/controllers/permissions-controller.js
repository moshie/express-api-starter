"use strict";

const findUserByEmail = require('../../auth/helpers/find-user-by-email');
const getRolesPermissions = require('../../roles/helpers/get-roles-permissions');

function permissionsController(req, res) {

    if (!res.locals.token && !res.locals.token.email) {
        return res.status(403).json({
            data: { message }
        });
    }

    findUserByEmail(res.locals.token.email)
        .then(user => getRolesPermissions(user.roles))
        .then(permissions => res.status(200).json({
            data: {
                permissions: permissions.map(permission => ({
                    display_name: permission.display_name,
                    name: permission.name,
                    description: permission.description
                }))
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({ 
            data: { message: err.message } 
        }));
}

module.exports = permissionsController;
