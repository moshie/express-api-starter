"use strict";

const getRolePermissions = require('../helpers/get-role-permissions');

function rolesPermissionsController(req, res) {

    if (!req.params.role_name) {
        return res.status(400).json({
            data: { message: 'No Role Name provided' }
        });
    }

    getRolePermissions(req.params.role_name)
        .then(permissions => res.status(200).json({
            data: { 
                permissions: permissions.map(permission => ({
                    name: permission.name,
                    description: permission.description
                }))
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}

module.exports = rolesPermissionsController;
