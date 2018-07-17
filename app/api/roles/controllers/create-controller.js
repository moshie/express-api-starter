"use strict";

const { validationResult } = require('express-validator/check')
const Role = require('../../../models/roles');

function createController(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    var role = new Role({
        name: req.body.name,
        description: req.body.description || ''
    });

    role.save()
        .then(() => res.status(200).json({
            data: { message: 'Role Created' }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));

}

module.exports = createController;
