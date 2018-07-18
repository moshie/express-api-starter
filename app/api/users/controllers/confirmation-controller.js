"use strict";

const findUserByEmail = require('../../auth/helpers/find-user-by-email');

function confirmationController(req, res) {

    if (!res.locals.token && !res.locals.token.email) {
        return res.status(403).json({
            data: { message }
        });
    }

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
