"use strict";

const findUserByEmail = require('../../auth/helpers/find-user-by-email');

function confirmationController(req, res) {

    if (!res.locals.token && !res.locals.token.user) {
        return res.status(403).json({
            data: { message }
        });
    }

    // TODO: Get user by ID

    findUserByEmail(res.locals.token.email)
        .then(user => res.status(200).json({
            data: {
                confirmed: user.confirmed
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({ 
            data: { message: err.message } 
        }));

}

module.exports = confirmationController
