'use strict'

const mailer = require('../../../services/mailer-service')
const generateToken = require('../helpers/generate-token')
const { validationResult } = require('express-validator/check')
const updatePasswordReset = require('../helpers/update-password-reset')
const findPossibleExistingPasswordReset = require('../helpers/find-possible-existing-password-reset')

function forgottenController(req, res) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            errors: errors.array()
        })
    }

    return findPossibleExistingPasswordReset(req.body.email)
        .then(doc => generateToken().then(token => updatePasswordReset(req.body.email, token, doc)))
        .then(doc => mailer().sendMail({
            from: process.env.WEBSITE_EMAIL,
            to: req.body.email,
            subject: 'Forgotten Password',
            html: doc.token // TODO
        }))
        .then(info => res.status(200).json({
            meta: {
                info,
                message: 'Forgotten Password E-mail sent successfully'
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem attempting to send a reset password email',
                detail: err.message
            }]
        }))

}

module.exports = forgottenController
