"use strict";

const getUserByID = require('../helpers/get-user-by-id');

function meController(req, res) {

    if (!res.locals.token && !res.locals.token.user) {
        return res.status(403).json({
            data: { message }
        });
    }

    return getUserByID(res.locals.token.user)
        .then(user => res.status(200).json({
            data: {
                user: {
                    first_name: user.first_name,
                    last_name: user.last_name || '',
                    email: user.email,
                    created_at: user.created_at
                }
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({ 
            data: { message: err.message } 
        }));

}

module.exports = meController;
