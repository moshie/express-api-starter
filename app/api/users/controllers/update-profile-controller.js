'use strict'

const updateUser = require('../helpers/update-user')

function UpdateProfileController(req, res) {

    if (!res.locals.token && !res.locals.token.user) {
        return res.status(403).json({
            errors: [{
                status: '403',
                title: 'Invalid Token',
                detail: 'User is not authenticated'
            }]
        })
    }

    return updateUser(res.locals.token.user, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
        .then(user => res.status(200).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    confirmed: user.confirmed,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            }
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: '500',
                title: 'There was a problem updating the user',
                detail: err.message
            }]
        }))
}

module.exports = UpdateProfileController
