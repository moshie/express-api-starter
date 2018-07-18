"use strict";

const { validationResult } = require('express-validator/check');
const saveRoleToUsers = require('../helpers/save-role-to-users');

function rolesUsersController(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    if (!req.params.role_name) {
        return res.status(400).json({
            data: { message: 'No Role Name provided' }
        });
    }

    saveRoleToUsers(req.params.role_name, req.body.users)
        .then(user => res.status(200).json({
            data: { message: 'User role updated' }
        }))
        .catch(err => res.status(err.statusCode).json({
            data: { message: err.message }
        }));

}

module.exports = rolesUsersController;
