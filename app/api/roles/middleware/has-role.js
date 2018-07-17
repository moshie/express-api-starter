"use strict";

function hasRole(role) {
    return function (req, res, next) {

        if (!res.locals.token && !res.locals.token.roles && res.locals.token.roles.indexOf(role) === -1) {
            return res.status(403).json({
                data: { message: 'Forbidden' }
            });
        }

        next();
    }
}

module.exports = hasRole;
