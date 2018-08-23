"use strict";

const Role = require('../../../models/roles');
const updateRole = require('../helpers/update-role');
const getRoleByName = require('../helpers/get-role-by-name');
const { validationResult } = require('express-validator/check');

exports.store = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    var role = new Role({
        display_name: req.body.display_name,
        name: req.body.name,
        description: req.body.description || ''
    });

    return role.save()
        .then(role => res.status(201).json({
            data: {
                type: 'role',
                id: role._id,
                attributes: {
                    display_name: role.display_name,
                    name: role.name,
                    description: role.description || '',
                    created_at: role.created_at,
                    updated_at: role.updated_at
                }
            }
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem saving the role',
                detail: err.message
            }]
        }));

}

exports.index = function (req, res) {

    return Role.find({})
        .then(roles => res.status(200).json({
            data: roles.map(role => ({
                type: 'role',
                id: role._id,
                attributes: {
                    display_name: role.display_name,
                    name: role.name,
                    description: role.description || '',
                    created_at: role.created_at,
                    updated_at: role.updated_at
                }
            })) || []
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: '500',
                title: 'There was a problem finding roles',
                detail: err.message
            }]
        }));

}

exports.show = function (req, res) {

    if (!req.params.role_name) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No role specified',
                detail: 'Define a role name to retrieve'
            }]
        });
    }

    return getRoleByName(req.params.role_name)
        .then(role => res.status(200).json({
            data: {
                type: 'role',
                id: role._id,
                attributes: {
                    display_name: role.display_name,
                    name: role.name,
                    description: role.description || '',
                    created_at: role.created_at,
                    updated_at: role.updated_at
                }
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem finding the role',
                detail: err.message
            }]
        }));

}

exports.update = function (req, res) {

    if (!req.params.role_name) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No role specified',
                detail: 'Define a role name to update'
            }]
        });
    }

    return updateRole(req.params.role_name, {
        display_name: req.body.display_name,
        name: req.body.name,
        description: req.body.description
    })
        .then(role => res.status(200).json({
            data: {
                type: 'role',
                id: role._id,
                attributes: {
                    display_name: role.display_name,
                    name: role.name,
                    description: role.description || '',
                    created_at: role.created_at,
                    updated_at: role.updated_at
                }
            }
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: '500',
                title: 'There was a problem updating the role',
                detail: err.message
            }]
        }));

}

exports.remove = function (req, res) {

    if (!req.params.role_name) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No role specified',
                detail: 'Define a role name to remove'
            }]
        });
    }

    return Role.deleteOne({ name: req.params.role_name })
        .then(() => res.status(200).json({
            meta: {
                message: 'Permission removed successfully'
            }
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: '500',
                title: 'There was a problem removing the role',
                detail: err.message
            }]
        }));

}
