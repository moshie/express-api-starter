"use strict";

const express = require('express');
const router = express.Router();

// Validator
//
const createValidator = require('./validators/create-validator');

// Controllers
//
const createController = require('./controllers/create-controller');

// Middleware
//
const authenticate = require('../auth/middleware/authenticate');
const hasPermission = require('./middleware/has-permission');
const hasRole = require('./middleware/has-role');



/* POST roles */
router.post('/', authenticate, hasRole('admin'), createValidator, createController);

/* GET roles */
//router.get('/', authenticate, hasRole('admin'), createController);

/*
GET     /roles/             -- Get all roles
GET     /roles/:role_id/    -- Get role by id
PUT     /roles/:role_id/    -- Update a role
DELETE  /roles/:role_id/    -- Delete a role

GET     /roles/:role_id/permissions/                -- Get a roles permissions
GET     /roles/:role_id/users/                      -- Get Users in a role
PUT     /roles/:role_id/users/                      -- Assign multiple users to a role ["ID", "ID", "ID"]


*/
module.exports = router;
