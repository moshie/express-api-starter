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

        const roles = res.locals.token.roles;

        if (typeof role === 'string' && !hasRoles(roles, [role])) {
            return forbidden();
        }

        if (Array.isArray(role) && !hasRoles(roles, role)) {
            return forbidden();
        }

        next();
    }
}

module.exports = hasRole;
