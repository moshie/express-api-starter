"use strict";

const express = require('express');
const router = express.Router();

// Validator
//
const registrationValidator = require('../auth/validators/registration-validator');
const updateUserValidator = require('./validators/update-user-validator');

// Controllers
//
const meController = require('./controllers/me-controller');
const rolesController = require('./controllers/roles-controller');
const permissionsController = require('./controllers/permissions-controller');
const confirmationController = require('./controllers/confirmation-controller');
const {
    store,
    index,
    show,
    update,
    remove
} = require('./controllers/resource-controller');

// Middleware
//
const authenticate = require('../auth/middleware/authenticate');
// const hasPermission = require('../permissions/middleware/has-permission');
const hasRole = require('../roles/middleware/has-role');


// Authenticated user endpoints
//

/* GET me */
router.get('/me', authenticate, meController);

/* GET user roles */
router.get('/roles', authenticate, rolesController);

/* GET user permissions */
router.get('/permissions', authenticate, permissionsController);

/* GET user confirmed */
router.get('/confirmed', authenticate, confirmationController);

// Administrator Endpoints
//

/* POST user */
router.post('/', authenticate, hasRole('admin'), registrationValidator, store);

/* GET users */
router.get('/', authenticate, hasRole('admin'), index);

/* GET user */
router.get('/:user_id', authenticate, hasRole('admin'), show);

/* PUT user */
router.put('/:user_id', authenticate, hasRole('admin'), updateUserValidator, update);

/* DELETE user */
router.delete('/:user_id', authenticate, hasRole('admin'), remove);

/* GET user roles */
router.get('/:user_id/roles', authenticate, hasRole('admin'), function () {
    // Get a particular users roles
});

/* PUT user role */
router.put('/:user_id/roles/:role_name', authenticate, hasRole('admin'), function () {
    // Assign a user a role
});

/* DELETE user role */
router.delete('/:user_id/roles/:role_name', authenticate, hasRole('admin'), function () {
    // Revoke a user a role
});

/* GET user permissions */
router.get('/:user_id/permissions', authenticate, hasRole('admin'), function () {
    // Get a users current permissions
});

/* GET user confirmed */
router.get('/:user_id/confirmed', authenticate, hasRole('admin'), function () {
    // Checks if user is confirmed or not
});

module.exports = router;
