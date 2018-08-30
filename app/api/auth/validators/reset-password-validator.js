'use strict'

const User = require('../../../models/user')
const { body } = require('express-validator/check')

const resetValidation = [

    body('email')
        .exists().isString().withMessage('E-mail is invalid')
        .not().isEmpty().withMessage('E-Mail is a required field')
        .isEmail().withMessage('E-mail is invalid')
        .custom(value => new Promise((resolve, reject) => {
            User.findOne({ email: value }, function (err, user) {
                if (err || user === null) {
                    return reject('User does not exist with that E-Mail')
                }
                resolve()
            })
        })),

    body('token')
        .exists().isString().withMessage('Token is invalid')
        .not().isEmpty().withMessage('Token is required'),

    body('password')
        .exists().isString().withMessage('Password is invalid')
        .not().isEmpty().withMessage('Password is a required field')
        .isLength({ max: 70 }).withMessage('Password must be less than 70 characters'),

    body('password_confirmation')
        .exists().isString().withMessage('Password Confirmation is invalid')
        .not().isEmpty().withMessage('Password Confirmation is a required field')
        .custom((value, { req }) => value === req.body.password).withMessage('Password confirmation and password must match')

]

module.exports = resetValidation
