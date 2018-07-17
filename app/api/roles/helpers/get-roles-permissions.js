"use strict";

const Role = require('../../../models/roles');

function getRolesPermissions(roles) {

    if (!Array.isArray(roles)) {
        return [];
    }

    var promises = roles.map(role => new Promise((resolve, reject) => {
        Role.findOne({ name: role })
            .populate({ path: 'permissions', select: 'name' })
            .exec(function (err, role) {
                if (err) {
                    return reject(err);
                }
                
                resolve(role === null ? [] : role.permissions);
            })
    }));

    return Promise.all(promises).then(permissions => permissions.reduce((acc, val) => acc.concat(val), []))
}

module.exports = getRolesPermissions;
