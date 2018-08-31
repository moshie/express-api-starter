'use strict'

const confirmAUser = require('../helpers/confirm-a-user')

function confirmationController(req, res) {

    if (!req.params.token) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'Invalid Token',
                detail: 'Confirmation Token is not provided'
            }]
        })
    }

    return confirmAUser(req.params.token)
        .then(user => res.status(200).json({
            data: {
                confirmed: user.confirmed
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({ 
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'Failed to confirm user\'s email',
                detail: err.message
            }]
        }))

}

module.exports = confirmationController
