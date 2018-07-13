"use strict";

const generateJWT = require('./generate-jwt');
const findUserByEmail = require('./find-user-by-email');
const comparePasswords = require('./compare-passwords');

function authenticate (email, password) {
    return findUserByEmail(email)
        .then(user => comparePasswords(user, password))
        .then(generateJWT);
}

module.exports = authenticate;
