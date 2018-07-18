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
// const hasPermission = require('./middleware/has-permission');
const hasRole = require('../roles/middleware/has-role');


/* POST permission */
router.post('/', authenticate, hasRole('admin'), permissionValidator, store);

/* GET permissions */
router.get('/', authenticate, hasRole('admin'), index);

/* GET permission */
router.get('/:name', authenticate, hasRole('admin'), show);

/* PUT permission */
router.put('/:name', authenticate, hasRole('admin'), permissionValidator, update);

/* DELETE permission */
router.delete('/:name', authenticate, hasRole('admin'), remove);

/* PUT permissions role */
router.put('/:name/roles', authenticate, hasRole('admin'), function () { // PUT or POST?
    // Assign multiple permissions to a role
});

/* PUT permission role */
router.put('/:name/roles/:role_name', authenticate, hasRole('admin'), function () {
    // Assign a permission to a role
});

/* DELETE permission role */
router.delete('/:name/roles/:role_name', authenticate, hasRole('admin'), function () {
    // Revoke a permission from a role
});

module.exports = router;
