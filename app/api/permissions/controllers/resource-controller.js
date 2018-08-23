"use strict";

const Permission = require('../../../models/permissions');
const updatePermission = require('../helpers/update-permission');
const getPermissionByName = require('../helpers/get-permission-by-name');

const { validationResult } = require('express-validator/check');

exports.store = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            errors: errors.array()
        });
    }

    var permission = new Permission({
        display_name: req.body.display_name,
        name: req.body.name,
        description: req.body.description || ''
    });

    return permission.save()
        .then(permission => res.status(201).json({
            data: {
                type: 'permission',
                id: permission._id,
                attributes: {
                    display_name: permission.display_name,
                    name: permission.name,
                    description: permission.description || '',
                    created_at: permission.created_at,
                    updated_at: permission.updated_at
                }
            }
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: '500',
                title: 'There was a problem while saving the permission',
                detail: err.message
            }]
        }));

}

exports.index = function (req, res) {

    return Permission.find({})
        .then(permissions => res.status(200).json({
            data: permissions.map(permission => ({
                type: 'permission',
                id: permission._id,
                attributes: {
                    display_name: permissions.display_name,
                    name: permissions.name,
                    description: permissions.description || '',
                    created_at: permission.created_at,
                    updated_at: permission.updated_at
                }
            })) || []
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: '500',
                title: 'There was a problem finding permissions',
                detail: err.message
            }]
        }));

}

exports.show = function (req, res) {

    if (!req.params.permission_name) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No permission specified',
                detail: 'Define a permission name to retrieve'
            }]
        });
    }

    return getPermissionByName(req.params.permission_name)
        .then(permission => res.status(200).json({
            data: {
                type: 'permission',
                id: permission._id,
                attributes: {
                    display_name: permission.display_name,
                    name: permission.name,
                    description: permission.description || '',
                    created_at: permission.created_at,
                    updated_at: permission.updated_at
                }
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem finding the permission',
                detail: err.message
            }]
        }));

}

exports.update = function (req, res) {

    if (!req.params.permission_name) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No permission specified',
                detail: 'Define a permission name to update'
            }]
        });
    }

    return updatePermission(req.params.permission_name, {
        display_name: req.body.display_name,
        name: req.body.name,
        description: req.body.description
    })
        .then(permission => res.status(200).json({
            data: {
                type: 'permission',
                id: permission._id,
                attributes: {
                    display_name: permission.display_name,
                    name: permission.name,
                    description: permission.description || '',
                    created_at: permission.created_at,
                    updated_at: permission.updated_at
                }
            }
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: '500',
                title: 'There was a problem updating the permission',
                detail: err.message
            }]
        }));

}

exports.remove = function (req, res) {

    if (!req.params.permission_name) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No permission specified',
                detail: 'Define a permission name to remove'
            }]
        });
    }

    return Permission.deleteOne({ name: req.params.permission_name })
        .then(() => res.status(200).json({
            meta: {
                message: 'Permission removed successfully'
            }
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: '500',
                title: 'There was a problem removing the permission',
                detail: err.message
            }]
        }));

}
