"use strict";

const mailer = require('../../../services/mailer-service');
const { validationResult } = require('express-validator/check');
const storePasswordResetToken = require('../helpers/store-password-reset-token');

function forgottenController(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    return storePasswordResetToken(req.body.email)
        .then(doc => mailer().sendMail({
            from: process.env.WEBSITE_EMAIL,
            to: req.body.email,
            subject: 'Forgotten Password',
            html: doc.token
        }))
        .then(info => res.status(200).json({
            data: { message: 'Forgotten Password E-mail sent successfully' } 
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message } 
        }));

}

module.exports = forgottenController;
