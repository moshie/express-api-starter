"use strict";

const express = require('express');
const router = express.Router();

const loginValidator = require('./validators/login-validator.js');
const registrationValidator = require('./validators/registration-validator.js');
const forgottenValidator = require('./validators/forgotten-password-validator');
const resetValidator = require('./validators/reset-password-validator');

const loginController = require('./controllers/login-controller.js');
const registrationController = require('./controllers/registration-controller.js');
const forgottenController = require('./controllers/forgotten-password-controller');
const resetController = require('./controllers/reset-password-controller');
const confirmationController = require('./controllers/confirmation-controller');

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

const authenticate = require('./middleware/authenticate');

router.get('/secret', authenticate, function (req, res) {
    res.status(200).json({
        message: 'Secret'
    })
})

module.exports = router;
