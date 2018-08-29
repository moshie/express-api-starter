"use strict";

const generateJWT = require('../helpers/generate-jwt');
const check = require('express-validator/check');
const comparePasswords = require('../helpers/compare-passwords');
const getUserByEmail = require('../../users/helpers/get-user-by-email');

function loginController(req, res) {

    const errors = check.validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array() 
        });
    }

    return getUserByEmail(req.body.email)
        .then(user => comparePasswords(user, req.body.password))
        .then(generateJWT)
        .then(token => res.status(200).json({
            data: {
                token
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem authenticating',
                detail: err.message
            }]
        }));

}

module.exports = loginController;
