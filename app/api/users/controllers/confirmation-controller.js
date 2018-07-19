"use strict";

const getUserByID = require('../helpers/get-user-by-id');

function confirmationController(req, res) {

    if (!res.locals.token && !res.locals.token.user) {
        return res.status(403).json({
            data: { message }
        });
    }

    getUserByID(res.locals.token.user)
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
