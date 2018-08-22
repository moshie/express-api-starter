"use strict";

const updateUser = require('../helpers/update-user');

function UpdateProfileController(req, res) {

    if (!res.locals.token && !res.locals.token.user) {
        return res.status(403).json({
            data: { message }
        });
    }

    return updateUser(res.locals.token.user, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
        .then(user => res.status(200).json({
            data: {
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }
            }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));
}

module.exports = UpdateProfileController;
