"use strict";

const { body } = require('express-validator/check');

const loginValidation = [

    body('email')
        .exists().isString().withMessage('E-mail is invalid')
        .not().isEmpty().withMessage('E-Mail is a required field')
        .isEmail().withMessage('E-mail is invalid'),

    body('password')
        .exists().isString().withMessage('Password is invalid')
        .not().isEmpty().withMessage('Password is a required field')

];

module.exports = loginValidation;
