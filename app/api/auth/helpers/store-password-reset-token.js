"use strict";

const generateToken = require('./generate-token');
const updatePasswordReset = require('./update-password-reset');
const findPossibleExistingPasswordReset = require('./find-possible-existing-password-reset')

function storePasswordResetToken(email) {
    return findPossibleExistingPasswordReset(email)
        .then(doc => generateToken()
            .then(token => updatePasswordReset(email, token, doc)));
}

module.exports = storePasswordResetToken;
