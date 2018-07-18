"use strict";

const findUserByEmail = require('../../auth/helpers/find-user-by-email');

function rolesController(req, res) {

    if (!res.locals.token && !res.locals.token.email) {
        return res.status(403).json({
            data: { message }
        });
    }

    findUserByEmail(res.locals.token.email)
        .then(user => res.status(200).json({
            data: {
                roles: user.roles.map(role => ({
                    display_name: role.display_name,
                    name: role.name,
                    description: role.description
                }))
            }
        }))
        .catch(err => res.status(err.statusCode).json({ 
            data: { message: err.message } 
        }));

}

module.exports = rolesController