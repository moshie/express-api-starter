'use strict'

const Role = require('../../../models/roles')
const ResponseException = require('../../../exceptions/response')

function updateRole(name, updatedRole) {
    return new Promise((resolve, reject) => {
        Role.updateOne({ name }, updatedRole, function (err, role) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            if (role === null) {
                return reject(new ResponseException('Role not found', 404))
            }

            resolve(role)
        })
    })
}

module.exports = updateRole
