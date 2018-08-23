"use strict";

const Permission = require('../../../models/permissions');

function updatePermission(name, updatedPermission) {
    return new Promise((resolve, reject) => {
        Permission.updateOne({ name }, updatedPermission, function (err, permission) {
            if (err) {
                return reject(new ResponseError(err.message));
            }

            if (permission === null) {
                return reject(new ResponseError('Permission not found', 404));
            }

            resolve(permission);
        })
    })
}

module.exports = updatePermission;
