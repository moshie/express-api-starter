"use strict";

const { validationResult } = require('express-validator/check');
const revokeUserFromRoles = require('../helpers/revoke-user-from-roles');

exports.revokeMultiple = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    if (!req.params.user_id) {
        return res.status(400).json({
            data: { message: 'No permission name provided' }
        });
    }

    return revokeUserFromRoles(req.params.user_id, req.body.roles)
        .then(user => res.status(200).json({
            data: { message: 'User updated' }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}

exports.revokeSingular = function (req, res) {

    function badRequest(message = 'Bad Request') {
        return res.status(400).json({
            data: { message }
        });
    }

    if (!req.params.user_id) {
        return badRequest('No user id provided');
    }

    if (!req.params.role_name) {
        return badRequest('No role name provided');
    }

    return revokeUserFromRoles(req.params.user_id, [req.params.role_name])
        .then(user => res.status(200).json({
            data: { message: 'User updated' }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}
