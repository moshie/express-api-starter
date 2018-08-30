'use strict'

const { hash } = require('bcrypt')
const getUserByEmail = require('../../users/helpers/get-user-by-email')
const resetUserPassword = require('./reset-user-password')
const deletePasswordResetEntry = require('./delete-password-reset-entry')
const findPasswordResetByEmailAndToken = require('./find-password-reset-by-email-and-token')

function resetPassword(email, token, password) {
    return findPasswordResetByEmailAndToken(email, token)
        .then(() => Promise.all([getUserByEmail(email), hash(password, 10)]))
        .then(resetUserPassword)
        .then(user => deletePasswordResetEntry(user))
}

module.exports = resetPassword
