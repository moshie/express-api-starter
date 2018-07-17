"use strict";

const getRolesPermissions = require('../helpers/get-roles-permissions');

function hasPermission(permission) {
    return function (req, res, next) {

        function Forbidden(message = 'Forbidden') {
            res.status(403).json({
                data: { message }
            });
        }

        if (!res.locals.token && !res.locals.token.roles) {
            return Forbidden();
        }

        getRolesPermissions(res.locals.token.roles)
            .then(permissions => {
                if (permissions.indexOf(permission) === -1) {
                    return Forbidden();
                }

                next();
            });

    }
}

module.exports = hasPermission;
