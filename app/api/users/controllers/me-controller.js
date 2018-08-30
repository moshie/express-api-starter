'use strict'

const getUserByID = require('../helpers/get-user-by-id')

function meController(req, res) {

    if (!res.locals.token && !res.locals.token.user) {
        return res.status(403).json({
            errors: [{
                status: '403',
                title: 'Invalid Token',
                detail: 'User is not authenticated'
            }]
        })
    }

    return getUserByID(res.locals.token.user)
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
        .catch(err => res.status(err.statusCode || 500).json({ 
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem getting the authenticated user',
                detail: err.message
            }]
        }))

}

module.exports = meController
