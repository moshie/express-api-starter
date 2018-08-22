"use strict";

const getRoleByName = require('../helpers/get-role-by-name');

function permissionsController(req, res) {

    if (!req.params.role_name) {
        return res.status(400).json({
            data: { message: 'No Role Name provided' }
        });
    }

    return getRoleByName(req.params.role_name)
        .then(role => res.status(200).json({
            data: {
                permissions: role.permissions.map(permission => ({
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
