"use strict";

const { body } = require('express-validator/check');

const usersRoleValidator = [

    body('users')
        .exists().isArray().withMessage('Users are invalid')
        .not().isEmpty().withMessage('Users are required')

];

module.exports = usersRoleValidator;