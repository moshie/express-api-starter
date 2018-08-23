"use strict";

const getUserByID = require('../../users/helpers/get-user-by-id');

exports.getAuthenticatedUsersRoles = function (req, res) {

    if (!res.locals.token && !res.locals.token.user) {
        return res.status(403).json({
            errors: [{
                status: '403',
                title: 'Invalid Token',
                detail: 'User is not authenticated'
            }]
        });
    }

    return getUserByID(res.locals.token.user)
        .then(user => res.status(200).json({
            data: user.roles.map(role => ({
                type: 'role',
                id: role._id,
                attributes: {
                    display_name: role.display_name,
                    name: role.name,
                    description: role.description || '',
                    created_at: role.created_at,
                    updated_at: role.updated_at
                }
            })) || []
        }))
        .catch(err => res.status(err.statusCode || 500).json({ 
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem getting the users roles',
                detail: err.message
            }]
        }));

}

exports.getUsersRoles = function (req, res) {

    if (!req.params.user_id) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No user specified',
                detail: 'Define a user id to retrieve'
            }]
        });
    }

    getUserByID(req.params.user_id)
        .then(user => ({
            data: user.roles.map(role => ({
                type: 'role',
                id: role._id,
                attributes: {
                    display_name: role.display_name,
                    name: role.name,
                    description: role.description || '',
                    created_at: role.created_at,
                    updated_at: role.updated_at
                }
            })) || []
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem getting the users roles',
                detail: err.message
            }]
        }));

}
