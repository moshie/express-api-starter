const express = require('express');
const router = express.Router();

const storeValidator = require('./validators/store-validator');

const storeController = require('./controllers/store-controller');


/*
NEEDS AUTH!

# USERS
POST    /users/             -- Create a new User
GET     /users/             -- Get all users
GET     /users/:user_id/    -- Get user by id
PUT     /users/:user_id/    -- Update a user
DELETE  /users/:user_id/    -- Delete a user

GET     /users/:user_id/roles/              -- Get a users roles
PUT     /users/:user_id/roles/:role_id/     -- Assign a user a role
DELETE  /users/:user_id/roles/:role_id/     -- Revoke a user a role

GET     /users/:user_id/permissions/        -- Get a users current permissions

GET     /users/:user_id/confirmed/          -- Checks if user is confirmed or not

*/


/* POST store */
router.post('/', storeValidator, storeController);

module.exports = router;
