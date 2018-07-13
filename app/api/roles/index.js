"use strict";

const express = require('express');
const router = express.Router();

// Validator
//


// Controllers
//


// Middleware
//
const authenticate = require('./middleware/authenticate');

/* POST Login */
/*

# ROLES
POST    /roles/             -- Create a new role
GET     /roles/             -- Get all roles
GET     /roles/:role_id/    -- Get role by id
PUT     /roles/:role_id/    -- Update a role
DELETE  /roles/:role_id/    -- Delete a role

GET     /roles/:role_id/permissions/                -- Get a roles permissions
GET     /roles/:role_id/users/                      -- Get Users in a role
PUT     /roles/:role_id/users/                      -- Assign multiple users to a role ["ID", "ID", "ID"]


*/
module.exports = router;
