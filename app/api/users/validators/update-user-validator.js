'use strict'

const User = require('../../../models/user')
const { body } = require('express-validator/check')

const updateUserValidation = [

    body('first_name')
        .exists().isString().withMessage('First Name is invalid')
        .not().isEmpty().withMessage('First Name is a required field'),

    body('email')
        .exists().isString().withMessage('E-mail is invalid')
        .not().isEmpty().withMessage('E-Mail is a required field')
        .isEmail().withMessage('E-mail is invalid')
        .custom(value => new Promise((resolve, reject) => {
            User.findOne({ email: value }, function (err, user) {
                if (err || user !== null) {
                    return reject('E-mail is already in use')
                }
                resolve()
            })
        }))

]

module.exports = updateUserValidation
