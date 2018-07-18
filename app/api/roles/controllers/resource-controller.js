"use strict";

const Role = require('../../../models/roles');
const updateRole = require('../helpers/update-role');
const getRoleByName = require('../helpers/get-role-by-name');
const { validationResult } = require('express-validator/check');

exports.store = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    var role = new Role({
        display_name: req.body.display_name,
        name: req.body.name,
        description: req.body.description || ''
    });

    role.save()
        .then(() => res.status(201).json({
            data: { message: 'Role Created' }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));

}

exports.index = function (req, res) {

    Role.find({})
        .then(roles => res.status(200).json({
            data: {
                roles: roles.map(role => ({ 
                    display_name: role.display_name,
                    name: role.name,
                    description: role.description
                })) || []
            }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));

}

exports.show = function (req, res) {

    if (!req.params.role_name) {
        return res.status(400).json({
            data: { message: 'No Role Name provided' }
        });
    }

    getRoleByName(req.params.role_name)
        .then(role => res.status(200).json({
            data: {
                role: {
                    display_name: role.display_name,
                    name: role.name,
                    description: role.description
                }
            }
        }))
        .catch(err => res.status(err.statusCode).json({
            data: { message: err.message }
        }));

}

exports.update = function (req, res) {

    if (!req.params.role_name) {
        return res.status(400).json({
            data: { message: 'No Role Name provided' }
        });
    }

    updateRole(req.params.role_name, {
        display_name: req.body.display_name,
        name: req.body.name,
        description: req.body.description
    })
        .then(role => res.status(200).json({
            data: {
                role: {
                    name: role.name,
                    description: role.description
                }
            }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));

}

exports.remove = function (req, res) {

    if (!req.params.role_name) {
        return res.status(400).json({
            data: { message: 'No Role Name provided' }
        });
    }

    Role.deleteOne({ name: req.params.role_name })
        .then(() => res.status(200).json({
            data: { message: 'Role removed successfully' }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));

}
