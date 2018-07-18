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

        if (typeof role === 'string' && res.locals.token.roles.indexOf(role) === -1) {
            return forbidden();
        }

        if (Array.isArray(role) && !hasRoles(res.locals.token.roles, role)) {
            return forbidden();
        }

        next();
    }
}

module.exports = hasRole;
