'use strict'

const { validationResult } = require('express-validator/check')
const revokePermissionFromRoles = require('../helpers/revoke-permission-from-roles')

exports.revokeMultiple = function (req, res) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            errors: errors.array()
        })
    }

    if (!req.params.permission_name) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No permission specified',
                detail: 'Define a permission to revoke'
            }]
        })
    }

    return revokePermissionFromRoles(req.params.permission_name, req.body.roles)
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
                title: 'There was a problem revoking the permission',
                detail: err.message
            }]
        }))

}

exports.revokeSingular = function (req, res) {

    function badRequest(title = 'Bad Request', detail = '') {
        return res.status(400).json({
            errors: [{
                status: '400',
                title,
                detail
            }]
        })
    }

    if (!req.params.permission_name) {
        return badRequest('No permission specified', 'Define a permission name to revoke')
    }

    if (!req.params.role_name) {
        return badRequest('No role specified', 'Define a role name to revoke from')
    }

    return revokePermissionFromRoles(req.params.permission_name, [req.params.role_name])
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
                title: 'There was a problem revoking the permission',
                detail: err.message
            }]
        }))

}
