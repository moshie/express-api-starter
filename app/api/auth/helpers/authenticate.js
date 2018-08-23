"use strict";

const generateJWT = require('./generate-jwt');
const getUserByEmail = require('./get-user-by-email');
const comparePasswords = require('./compare-passwords');

function authenticate (email, password) {
    return getUserByEmail(email)
        .then(user => comparePasswords(user, password))
        .then(generateJWT);
}

module.exports = authenticate;
