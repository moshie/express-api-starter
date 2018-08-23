"use strict";

const confirmAUser = require('../helpers/confirm-a-user');

function confirmationController(req, res) {

    return confirmAUser(req.params.token)
        .then(user => res.status(200).json({
            data: {
                confirmed: user.confirmed,
                message: 'Users email was confirmed successfully'
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({ 
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'Failed to confirm user\'s email',
                detail: ''
            }]
        }));

}

module.exports = confirmationController;
