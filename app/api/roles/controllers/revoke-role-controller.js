"use strict";

const revokeRolefromUsers = require('../helpers/revoke-role-from-users');

function revokeRoleController(req, res) {

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

    revokeRolefromUsers(req.params.role_name, [req.params.email])
        .then(user => res.status(200).json({
            data: { message: 'User role removed' }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}

module.exports = revokeRoleController;
