"use strict";

const saveRoleToUsers = require('../helpers/save-role-to-users');

function assignRoleController(req, res) {

    function badRequest(message = 'Bad Request') {
        return res.status(400).json({
            data: { message }
        });
    }

    if (!req.params.role_name) {
        return badRequest('No Role Name provided');
    }

    if (!req.params.email) {
        return badRequest('No Email provided');
    }

    saveRoleToUsers(req.params.role_name, [req.params.email])
        .then(user => res.status(200).json({
            data: { message: 'User role updated' }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}

module.exports = assignRoleController;
