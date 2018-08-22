"use strict";

const authenticate = require('../helpers/authenticate');
const { validationResult } = require('express-validator/check')

function loginController(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    return authenticate(req.body.email, req.body.password)
        .then(token => res.status(200).json({
            data: { token }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}

module.exports = loginController;
