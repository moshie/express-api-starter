"use strict";

const mailer = require('../../../services/mailer-service');
const resetPassword = require('../helpers/reset-password');
const { validationResult } = require('express-validator/check');

function resetController(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    return resetPassword(req.body.email, req.body.token, req.body.password)
        .then(user => mailer().sendMail({
            from: process.env.WEBSITE_EMAIL,
            to: user.email,
            subject: 'Password Updated',
            html: `${user.full_name} your password has been updated`
        }))
        .then(info => res.status(200).json({
            data: { message: 'Password reset successfully' }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}

module.exports = resetController;
