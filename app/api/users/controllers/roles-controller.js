"use strict";

const getUserByID = require('../../users/helpers/get-user-by-id');

exports.getAuthenticatedUsersRoles = function (req, res) {

    if (!res.locals.token && !res.locals.token.user) {
        return res.status(403).json({
            data: { message }
        });
    }

    return getUserByID(res.locals.token.user)
        .then(user => res.status(200).json({
            data: {
                roles: user.roles.map(role => ({
                    display_name: role.display_name,
                    name: role.name,
                    description: role.description
                }))
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({ 
            data: { message: err.message } 
        }));

}

exports.getUsersRoles = function (req, res) {

    if (!req.params.user_id) {
        return res.status(400).json({
            data: { message: 'No user id provided' }
        });
    }

    getUserByID(req.params.user_id)
        .then(user => ({
            data: user.roles.map(role => ({
                display_name: role.display_name,
                name: role.name,
                description: role.description
            }))
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}
