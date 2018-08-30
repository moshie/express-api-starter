'use strict'

const mailer = require('../../../services/mailer-service')
const resetPassword = require('../helpers/reset-password')
const { validationResult } = require('express-validator/check')

function resetController(req, res) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            errors: errors.array()
        })
    }

    return resetPassword(req.body.email, req.body.token, req.body.password)
        .then(user => {
            mailer().sendMail({
                from: process.env.WEBSITE_EMAIL,
                to: user.email,
                subject: 'Password Updated',
                html: `${user.full_name} your password has been updated`
            })
            return user
        })
        .then(user => res.status(200).json({
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
                title: 'There was a problem reseting the password',
                detail: err.message
            }]
        }))

}

module.exports = resetController
