"use strict";

const { body } = require('express-validator/check');
const Permission = require('../../../models/permissions');

const createValidation = [

    body('display_name')
        .exists().isString().withMessage('Display name is invalid')
        .not().isEmpty().withMessage('Display name is required'),

    body('name')
        .exists().isString().withMessage('Name is invalid')
        .not().isEmpty().withMessage('Name is a required field')
        .custom(value => new Promise((resolve, reject) => {
            Permission.findOne({ name: value }, function (err, role) {
                if (err || role !== null) {
                    return reject('Permission name is already in use');
                }
                resolve();
            })
        })),

    body('description')
        .exists().isString().withMessage('Description is invalid')

];

module.exports = createValidation;
