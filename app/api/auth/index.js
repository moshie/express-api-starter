"use strict";

const express = require('express');
const router = express.Router();

// Validator
//
const loginValidator = require('./validators/login-validator.js');
const registrationValidator = require('./validators/registration-validator.js');
const forgottenValidator = require('./validators/forgotten-password-validator');
const resetValidator = require('./validators/reset-password-validator');

// Controllers
//
const loginController = require('./controllers/login-controller.js');
const registrationController = require('./controllers/registration-controller.js');
const forgottenController = require('./controllers/forgotten-password-controller');
const resetController = require('./controllers/reset-password-controller');
const confirmationController = require('./controllers/confirmation-controller');

// Middleware
//
// const authenticate = require('./middleware/authenticate');

// TODO: Middleware checking for bearer token if the user is already authenticated return unauthorised

/* POST Login */
router.post('/login', loginValidator, loginController);

/* POST Register */
router.post('/register', registrationValidator, registrationController);

/* POST Forgot */
router.post('/forgot', forgottenValidator, forgottenController);

/* POST Reset */
router.post('/reset', resetValidator, resetController);

/* GET Confirmation */
router.get('/confirm/:token', confirmationController);

module.exports = router;
