'use strict'

const User = require('../../../models/user')
const { body } = require('express-validator/check')

const forgottenValidation = [

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
        }))

]

module.exports = forgottenValidation
