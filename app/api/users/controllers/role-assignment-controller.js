"use strict";

const { validationResult } = require('express-validator/check');
const saveUserToRoles = require('../helpers/save-user-to-roles');

exports.assignMultiple = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    if (!req.params.user_id) {
        return res.status(400).json({
            data: { message: 'No user id provided' }
        });
    }

    return saveUserToRoles(req.params.user_id, req.body.roles)
        .then(user => res.status(200).json({
            data: { message: 'User updated' }
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

    if (!req.params.user_id) {
        return badRequest('No User ID provided');
    }

    if (!req.params.role_name) {
        return badRequest('No Role Name provided');
    }

    return saveUserToRoles(req.params.user_id, [req.params.role_name])
        .then(user => res.status(200).json({
            data: { message: 'User updated' }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));
}

