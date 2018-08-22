"use strict";

const confirmAUser = require('../helpers/confirm-a-user');

function confirmationController(req, res) {
    return confirmAUser(req.params.token)
        .then(info => res.status(200).json({
            data: { message: 'Users E-mail was confirmed successfully' } 
        }))
        .catch(err => res.status(err.statusCode || 500).json({ 
            data: { message: err.message } 
        }));
}

module.exports = confirmationController;
