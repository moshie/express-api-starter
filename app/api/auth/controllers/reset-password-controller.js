'use strict'

const bcrypt = require('bcrypt')
const mailer = require('../../../services/mailer-service')
const getUserByEmail = require('../../users/helpers/get-user-by-email')
const resetUserPassword = require('../helpers/reset-user-password')
const deletePasswordResetEntry = require('../helpers/delete-password-reset-entry')
const findPasswordResetByEmailAndToken = require('../helpers/find-password-reset-by-email-and-token')
const check = require('express-validator/check')

function resetController(req, res) {

    const errors = check.validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            errors: errors.array()
        })
    }

    return findPasswordResetByEmailAndToken(req.body.email, req.body.token)
        .then(() => Promise.all([getUserByEmail(req.body.email), bcrypt.hash(req.body.password, 10)]))
        .then(resetUserPassword)
        .then(user => deletePasswordResetEntry(user))
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
