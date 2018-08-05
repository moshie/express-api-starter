"use strict";

const hasRoles = require('../helpers/has-roles');
const getUserByID = require('../../users/helpers/get-user-by-id');

function hasRole(role) {
    return function (req, res, next) {

        function forbidden(message = 'Forbidden') {
            return res.status(403).json({
                data: { message }
            });
        }

        if (!res.locals.token && !res.locals.token.user) {
            return forbidden();
        }

        getUserByID(res.locals.token.user)
            .then(user => {
                if (!hasRoles(user.roles, typeof role === 'string' ? [role] : role)) {
                    return forbidden();
                }

                next();
            })
            .catch(err => res.status(500).json({
                data: { message: err.message }
            }));

    }
}

module.exports = hasRole;
