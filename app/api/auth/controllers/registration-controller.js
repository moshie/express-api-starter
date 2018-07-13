"use strict";

const User = require('../../../models/user');
const mailer = require('../../../services/mailer-service');
const { validationResult } = require('express-validator/check');

function registrationController(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    var user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name || '',
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then(user => mailer().sendMail({
            from: process.env.WEBSITE_EMAIL,
            to: user.email,
            subject: 'Confirm your Email',
            html: user.confirmation_token
        }))
        .then(() => res.status(200).json({
            data: { message: 'User Created' }
        }))
        .catch(err => res.status(err.statusCode).json({
            data: { message: err.message }
        }));

}

module.exports = registrationController;
