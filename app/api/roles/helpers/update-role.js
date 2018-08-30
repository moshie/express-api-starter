'use strict'

const Role = require('../../../models/roles')
const ResponseError = require('../../../error-handlers/response-error')

function updateRole(name, updatedRole) {
    return new Promise((resolve, reject) => {
        Role.updateOne({ name }, updatedRole, function (err, role) {
            if (err) {
                return reject(new ResponseError(err.message))
            }

            if (role === null) {
                return reject(new ResponseError('Role not found', 404))
            }

            resolve(role)
        })
    })
}

module.exports = updateRole
