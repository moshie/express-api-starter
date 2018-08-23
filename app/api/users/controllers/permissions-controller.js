"use strict";

const getUserByID = require('../helpers/get-user-by-id');
const getRolesPermissions = require('../../roles/helpers/get-roles-permissions');

exports.getAuthenticatedUsersPermissions = function (req, res) {

    if (!res.locals.token && !res.locals.token.user) {
        return res.status(403).json({
            data: { message }
        });
    }

    return getUserByID(res.locals.token.user)
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

exports.getUsersPermissions = function (req, res) {

    if (!req.params.user_id) {
        return res.status(400).json({
            data: { message: 'No user id provided' }
        });
    }

    return getUserByID(req.params.user_id)
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
