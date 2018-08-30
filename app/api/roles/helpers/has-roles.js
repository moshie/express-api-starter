'use strict'

function hasRoles(usersRoles, roles) {
    var hasRole = false

    usersRoles = usersRoles.map(role => role.name)

    for (let i = 0; i < roles.length; i++) {
        if (usersRoles.indexOf(roles[i]) !== -1) {
            hasRole = true
            break
        }
    }

    return hasRole
}

module.exports = hasRoles
