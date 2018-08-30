'use strict'

const getRolesPermissions = require('../../roles/helpers/get-roles-permissions')
const getUserByID = require('../../users/helpers/get-user-by-id')

function hasPermission(permission) {
    return function (req, res, next) {

        function Forbidden(message = 'Forbidden') {
            res.status(403).json({
                data: { message }
            })
        }

        if (!res.locals.token && !res.locals.token.user) {
            return Forbidden()
        }

        getUserByID(res.locals.token.user)
            .then(user => getRolesPermissions(user.roles))
            .then(permissions => {
                if (permissions.indexOf(permission) === -1) {
                    return Forbidden()
                }

                next()
            })

    }
}

module.exports = hasPermission
