"use strict";

const Role = require('../../../models/roles');

function getRolesPermissions(roles) {

    if (!Array.isArray(roles)) {
        return [];
    }

    var promises = roles.map(role => new Promise((resolve, reject) => {
        Role.findOne({ name: role.name })
            .populate({ path: 'permissions', select: 'name' })
            .exec(function (err, _role) {
                if (err) {
                    return reject(err);
                }
                
                resolve(_role === null ? [] : _role.permissions);
            })
    }));

    return Promise.all(promises)
        .then(permissions => {
            return permissions
                .reduce((acc, val) => acc.concat(val), [])
                .filter((permission, index, self) => self.indexOf(permission) === index);
        })
}

module.exports = getRolesPermissions;
