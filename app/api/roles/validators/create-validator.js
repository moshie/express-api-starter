"use strict";

const { body } = require('express-validator/check');
const Role = require('../../../models/roles');

const createValidation = [

    body('name')
        .exists().isString().withMessage('Name is invalid')
        .not().isEmpty().withMessage('Name is a required field')
        .custom(value => new Promise((resolve, reject) => {
            Role.findOne({ name: value }, function (err, role) {
                if (err || role !== null) {
                    return reject('Role name is already in use');
                }
                resolve();
            })
        })),

    body('description')
        .exists().isString().withMessage('Description is invalid')

];

module.exports = createValidation;
