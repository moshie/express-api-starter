"use strict";

const express = require('express');
const router = express.Router();

// Validator
//
const roleValidator = require('./validators/role-validator');

// Controllers
//
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
// const hasPermission = require('./middleware/has-permission');
const hasRole = require('./middleware/has-role');


/* POST role */
router.post('/', authenticate, hasRole('admin'), roleValidator, store);

/* GET roles */
router.get('/', authenticate, hasRole('admin'), index);

/* GET role */
router.get('/:role_name', authenticate, hasRole('admin'), show);

/* PUT role */
router.put('/:role_name', authenticate, hasRole('admin'), roleValidator, update);

/* DELETE role */
router.delete('/:role_name', authenticate, hasRole('admin'), roleValidator, remove);

/* GET role permissions */
router.get('/:role_name/permissions', authenticate, hasRole('admin'), function () {
    // Get a roles permissions
});


router.get('/:role_name/users', authenticate, hasRole('admin'), function () {
    // Get Users in a role
});

router.put('/:role_name/users', authenticate, hasRole('admin'), function () {
    // Assign multiple users to a role ["ID", "ID", "ID"]
});

module.exports = router;
