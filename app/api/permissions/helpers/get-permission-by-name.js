"use strict";

const Permission = require('../../../models/permission');
const ResponseError = require('../../../error-handlers/response-error');

function getPermissionByName(name) {
    return new Promise((resolve, reject) => {
        Permission.findOne({ name }, function (err, permission) {
            if (err) {
                return reject(new ResponseError(err.message));
            }

            if (permission === null) {
                return reject(new ResponseError('Permission not found', 404));
            }

            resolve(permission);
        })
    });
}

module.exports = getPermissionByName;
