"use strict";

const User = require('../../../models/user');
const { body } = require('express-validator/check');

const registrationValidation = [

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
                    return reject('E-mail is already in use');
                }
                resolve();
            })
        })),

    body('password')
        .exists().isString().withMessage('Password is invalid')
        .not().isEmpty().withMessage('Password is a required field')
        .isLength({ max: 70 }).withMessage('Password must be less than 70 characters'),

    body('password_confirmation')
        .exists().isString().withMessage('Password Confirmation is invalid')
        .not().isEmpty().withMessage('Password Confirmation is a required field')
        .custom((value, { req }) => value === req.body.password).withMessage('Password confirmation and password must match')
];

module.exports = registrationValidation;
