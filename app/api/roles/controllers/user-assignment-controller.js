"use strict";

const { validationResult } = require('express-validator/check');
const saveRoleToUsers = require('../helpers/save-role-to-users');

exports.assignMultiple = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    if (!req.params.role_name) {
        return res.status(400).json({
            data: { message: 'No Role Name provided' }
        });
    }

    return saveRoleToUsers(req.params.role_name, req.body.users)
        .then(user => res.status(200).json({
            data: { message: 'Users updated' }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}

exports.assignSingular = function (req, res) {

    function badRequest(message = 'Bad Request') {
        return res.status(400).json({
            data: { message }
        });
    }

    if (!req.params.role_name) {
        return badRequest('No Role Name provided');
    }

    if (!req.params.user_id) {
        return badRequest('No User ID provided');
    }

    return saveRoleToUsers(req.params.role_name, [req.params.user_id])
        .then(user => res.status(200).json({
            data: { message: 'User role updated' }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}