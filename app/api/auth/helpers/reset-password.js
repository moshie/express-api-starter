"use strict";

const { hash } = require('bcrypt');
const getUserByEmail = require('../../users/helpers/get-user-by-email');
const resetUserPassword = require('./reset-user-password');
const PasswordResets = require('../../../models/password-resets');
const deletePasswordResetEntry = require('./delete-password-reset-entry');
const findPasswordResetByEmailAndToken = require('./find-password-reset-by-email-and-token');

function resetPassword(email, token, password) {
    return findPasswordResetByEmailAndToken(email, token)
        .then(doc => Promise.all([getUserByEmail(email), hash(password, 10)]))
        .then(resetUserPassword)
        .then(user => deletePasswordResetEntry(user))
}

module.exports = resetPassword;
