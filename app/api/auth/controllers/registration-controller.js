'use strict'

const User = require('../../../models/user')
const mailer = require('../../../services/mailer-service')
const { validationResult } = require('express-validator/check')

function registrationController(req, res) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            errors: errors.array()
        })
    }

    var user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name || '',
        email: req.body.email,
        password: req.body.password
    })

    return user.save()
        .then(user => {
            mailer().sendMail({
                from: process.env.WEBSITE_EMAIL,
                to: user.email,
                subject: 'Confirm your Email',
                html: user.confirmation_token
            })
            return user
        })
        .then(user => res.status(201).json({
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
                title: 'There was a problem registering',
                detail: err.message
            }]
        }))

}

module.exports = registrationController
