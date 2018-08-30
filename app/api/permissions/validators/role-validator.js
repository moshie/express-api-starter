'use strict'

const { body } = require('express-validator/check')

const roleValidator = [

    body('roles')
        .exists().isArray().withMessage('Roles are invalid')
        .not().isEmpty().withMessage('Roles are required')

]

module.exports = roleValidator