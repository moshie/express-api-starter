"use strict";

const Permission = require('../../../models/permissions');
const updatePermission = require('../helpers/update-permission');
const getPermissionByName = require('../helpers/get-permission-by-name');

const { validationResult } = require('express-validator/check');

exports.store = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    var permission = new Permission({
        display_name: req.body.display_name,
        name: req.body.name,
        description: req.body.description || ''
    });

    return permission.save()
        .then(() => res.status(201).json({
            data: { message: 'Permission Created' }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));

}

exports.index = function (req, res) {

    return Permission.find({})
        .then(permissions => res.status(200).json({
            data: {
                permissions: permissions.map(permission => ({ 
                    display_name: permissions.display_name,
                    name: permissions.name,
                    description: permissions.description
                })) || []
            }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));

}

exports.show = function (req, res) {

    if (!req.params.permission_name) {
        return res.status(400).json({
            data: { message: 'No Permission Name provided' }
        });
    }

    return getPermissionByName(req.params.permission_name)
        .then(permission => res.status(200).json({
            data: {
                permission: {
                    display_name: permission.display_name,
                    name: permission.name,
                    description: permission.description
                }
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}

exports.update = function (req, res) {

    if (!req.params.permission_name) {
        return res.status(400).json({
            data: { message: 'No Permission Name provided' }
        });
    }

    return updatePermission(req.params.permission_name, {
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

    if (!req.params.permission_name) {
        return res.status(400).json({
            data: { message: 'No Permission Name provided' }
        });
    }

    return Permission.deleteOne({ name: req.params.permission_name })
        .then(() => res.status(200).json({
            data: { message: 'Permission removed successfully' }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));

}
