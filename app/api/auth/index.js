'use strict'

const express = require('express')
const router = express.Router()

const guest = require('./middleware/guest')

/**
 * Name: Login
 * Method: POST
 * Auth: false
 * Role: 
 * Description: Login to access restricted endpoints
 */
router.post('/login', guest, require('./validators/login-validator.js'), require('./controllers/login-controller.js'))

/**
 * Name: Register
 * Method: POST
 * Auth: false
 * Role: 
 * Description: Register with user information
 */
router.post('/register', guest, require('./validators/registration-validator.js'), require('./controllers/registration-controller.js'))

/**
 * Name: Forgotten Password
 * Method: POST
 * Auth: false
 * Role: 
 * Description: Send forgotten email
 */
router.post('/forgot', guest, require('./validators/forgotten-password-validator'), require('./controllers/forgotten-password-controller'))

/**
 * Name: Reset
 * Method: POST
 * Auth: false
 * Role: 
 * Description: Reset users password
 */
router.post('/reset', guest, require('./validators/reset-password-validator'), require('./controllers/reset-password-controller'))

/**
 * Name: Email Confirmation
 * Method: GET
 * Auth: false
 * Role: 
 * Description: Confirm email is genuine
 */
router.get('/confirm/:token', require('./controllers/confirmation-controller'))

module.exports = router
