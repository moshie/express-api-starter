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


# USERS
POST    /users/             -- Create a new User
GET     /users/             -- Get all users
GET     /users/:user_id/    -- Get user by id
PUT     /users/:user_id/    -- Update a user
DELETE  /users/:user_id/    -- Delete a user


# ROLES
POST    /roles/             -- Create a new role
GET     /roles/             -- Get all roles
GET     /roles/:role_id/    -- Get role by id
PUT     /roles/:role_id/    -- Update a role
DELETE  /roles/:role_id/    -- Delete a role


# PERMISSIONS
POST    /permissions/                   -- Create a new role
GET     /permissions/                   -- Get all permissions
GET     /permissions/:permissions_id/   -- Get role by id
PUT     /permissions/:permissions_id/   -- Update a role
DELETE  /permissions/:permissions_id/   -- Delete a role



# USERS
PUT     /users/:user_id/roles/:role_id  -- Assign a user to a role
DELETE  /users/:user_id/roles/:role_id  -- Revoke User role
GET     /users/:user_id/roles           -- Get a users roles
POST    /roles/:id/membership           -- Bulk assign users to a role
GET     /roles/:role_id/membership      -- Get users with a particular role
GET     /users/:user_id/permissions     -- Get a users permissions

# ROLES 
POST    /roles                          -- Create a new role
GET     /roles                          -- Get all roles
GET     /roles/:id                      -- Get a role
PUT     /roles/:id                      -- Update a role
DELETE  /roles/:id                      -- Delete a role
GET     /roles/:id/exists               -- Check role exists
GET     /roles/:id/count                -- Check total role count

PUT     /roles/:role_id/permissions/:permisson_id   -- Assign a permission to a role
DELETE  /roles/:role_id/permissions/:permisson_id   -- Revoke a permission from a role
GET     /permissions/:permissions/membership        -- Get roles with a particular permission

# PERMISSONS
POST    /permissions                                -- Create a new permission
GET     /permissions/:id                            -- Get a permission
PUT     /permissions/:id                            -- Update a permission
DELETE  /permissions/:id                            -- Delete a permission





/update
/


*/
module.exports = router;
