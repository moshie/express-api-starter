'use strict'

const getRoleByName = require('../helpers/get-role-by-name')

function permissionsController(req, res) {

    if (!req.params.role_name) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No role specified',
                detail: 'Define a role to retrieve it\'s permissions'
            }]
        })
    }

    return getRoleByName(req.params.role_name)
        .then(role => res.status(200).json({
            data: role.permissions.map(permission => ({
                type: 'permission',
                id: permission._id,
                attributes: {
                    display_name: permission.display_name,
                    name: permission.name,
                    description: permission.description || '',
                    created_at: permission.created_at,
                    updated_at: permission.updated_at
                }
            })) || []
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem retrieving the roles permission',
                detail: err.message
            }]
        }))

}

module.exports = permissionsController
