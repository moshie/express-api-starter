'use strict'

const getUserByID = require('../helpers/get-user-by-id')
const getRolesPermissions = require('../../roles/helpers/get-roles-permissions')

exports.getAuthenticatedUsersPermissions = function (req, res) {

    if (!res.locals.token && !res.locals.token.user) {
        return res.status(403).json({
            errors: [{
                status: '403',
                title: 'Invalid Token',
                detail: 'User is not authenticated'
            }]
        })
    }

    return getUserByID(res.locals.token.user)
        .then(user => getRolesPermissions(user.roles))
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
        .catch(err => res.status(err.statusCode || 500).json({ 
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem revoking the role',
                detail: err.message
            }]
        }))
}

exports.getUsersPermissions = function (req, res) {

    if (!req.params.user_id) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No user specified',
                detail: 'Define a user id to revoke'
            }]
        })
    }

    return getUserByID(req.params.user_id)
        .then(user => getRolesPermissions(user.roles))
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
        .catch(err => res.status(err.statusCode || 500).json({ 
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem retrieving the users permissions',
                detail: err.message
            }]
        }))

}
