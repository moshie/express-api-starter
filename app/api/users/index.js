"use strict";

const express = require('express');
const router = express.Router();

// Validator
//


// Controllers
//


// Middleware
//
const authenticate = require('../auth/middleware/authenticate');
// const hasPermission = require('../permissions/middleware/has-permission');
const hasRole = require('../roles/middleware/has-role');


// Authenticated user endpoints
//

/* GET me */
router.get('/me', authenticate, function () {
    // Get authenticated user
});

/* GET user roles */
router.get('/roles', authenticate, function () {
    // Get authenticated user's roles
});

/* GET user permissions */
router.get('/permissions', authenticate, function () {
    // Get authenticated user's permissions
});

/* GET user confirmed */
router.get('/confirmed', authenticate, function () {
    // Checks if user is confirmed or not
});

// Administrator Endpoints
//

/* POST user */
router.post('/', authenticate, hasRole('admin'), userValidator, store);

/* GET users */
router.get('/', authenticate, hasRole('admin'), index);

/* GET user */
router.get('/:email', authenticate, hasRole('admin'), show);

/* PUT user */
router.put('/:email', authenticate, hasRole('admin'), userValidator, update);

/* DELETE user */
router.delete('/:email', authenticate, hasRole('admin'), remove);

/* GET user roles */
router.get('/:email/roles', authenticate, hasRole('admin'), function () {
    // Get a particular users roles
});

/* PUT user role */
router.put('/:email/roles/:role_name', authenticate, hasRole('admin'), function () {
    // Assign a user a role
});

/* DELETE user role */
router.delete('/:email/roles/:role_name', authenticate, hasRole('admin'), function () {
    // Revoke a user a role
});

/* GET user permissions */
router.get('/:email/permissions', authenticate, hasRole('admin'), function () {
    // Get a users current permissions
});

/* GET user confirmed */
router.get('/:email/confirmed', authenticate, hasRole('admin'), function () {
    // Checks if user is confirmed or not
});

module.exports = router;
