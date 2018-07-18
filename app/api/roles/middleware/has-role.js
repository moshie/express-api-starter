"use strict";

const hasRoles = require('../helpers/has-roles');

function hasRole(role) {
    return function (req, res, next) {

        function forbidden(message = 'Forbidden') {
            return res.status(403).json({
                data: { message }
            });
        }

        if (!res.locals.token && !res.locals.token.roles) {
            return forbidden();
        }

        const user = res.locals.token.user;

        // TODO: Get User by id pass roles into hasRoles
        if (!hasRoles(roles, typeof role === 'string' ? [role] : role)) {
            return forbidden();
        }

        next();
    }
}

module.exports = hasRole;
