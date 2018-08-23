"use strict";

const { validationResult } = require('express-validator/check');
const saveRoleToUsers = require('../helpers/save-role-to-users');

exports.assignMultiple = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    if (!req.params.role_name) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No role specified',
                detail: 'Define a role name to assign'
            }]
        });
    }

    return saveRoleToUsers(req.params.role_name, req.body.users)
        .then(user => res.status(200).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    confirmed: user.confirmed,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem assigning roles to user',
                detail: err.message
            }]
        }));

}

exports.assignSingular = function (req, res) {

    function badRequest(title = 'Bad Request', detail = '') {
        return res.status(400).json({
            errors: [{
                status: '400',
                title,
                detail
            }]
        });
    }

    if (!req.params.role_name) {
        return badRequest('No role specified', 'Define a role name');
    }

    if (!req.params.user_id) {
        return badRequest('No user specified', 'Define a user id to assign to');
    }

    return saveRoleToUsers(req.params.role_name, [req.params.user_id])
        .then(user => res.status(200).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    confirmed: user.confirmed,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem assigning role to user',
                detail: err.message
            }]
        }));

}
