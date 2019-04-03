'use strict'

const Permission = require('../../../models/permissions')
const ResponseException = require('../../../exceptions/response')

function updatePermission(name, updatedPermission) {
    return new Promise((resolve, reject) => {
        Permission.updateOne({ name }, updatedPermission, function (err, permission) {
            if (err) {
                return reject(new ResponseException(err.message))
            }

            if (permission === null) {
                return reject(new ResponseException('Permission not found', 404))
            }

            resolve(permission)
        })
    })
}

module.exports = updatePermission
