"use strict";

const { validationResult } = require('express-validator/check');
const revokePermissionFromRoles = require('../helpers/revoke-permission-from-roles');

exports.revokeMultiple = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    if (!req.params.permission_name) {
        return res.status(400).json({
            data: { message: 'No permission name provided' }
        });
    }

    return revokePermissionFromRoles(req.params.permission_name, req.body.roles)
        .then(role => res.status(200).json({
            data: { message: 'Roles updated' }
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

    if (!req.params.permission_name) {
        return badRequest('No permission name provided');
    }

    if (!req.params.role_name) {
        return badRequest('No role name provided');
    }

    return revokePermissionFromRoles(req.params.permission_name, [req.params.role_name])
        .then(role => res.status(200).json({
            data: { message: 'Role updated' }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}
