"use strict";

const express = require('express');
const router = express.Router();

const { store, index, show, update, remove } = require('./controllers/resource-controller');
const { getAuthenticatedUsersRoles, getUsersRoles, assignRoleToUser, revokeRoleFromUser } = require('./controllers/roles-controller');
const { getAuthenticatedUsersPermissions, getUsersPermissions } = require('./controllers/permissions-controller');
const { getAuthenticatedUsersConfirmation, getUsersConfirmation } = require('./controllers/confirmation-controller');

const auth = require('../auth/middleware/authenticate');
// const guestMiddleware = require('../auth/middleware/guest');
// const hasPermission = require('../permissions/middleware/has-permission');
const hasRole = require('../roles/middleware/has-role');

/**
 * Name: Me
 * Method: GET
 * Auth: true
 * Role: 
 * Description: Authenticated user information
 */
router.get('/me', auth, require('./controllers/me-controller'));

/**
 * Name: User's roles
 * Method: GET
 * Auth: true
 * Role: 
 * Description: Authenticated user's roles
 */
router.get('/roles', auth, getAuthenticatedUsersRoles);

/**
 * Name: User's permissions
 * Method: GET
 * Auth: true
 * Role: 
 * Description: Authenticated user's permissions
 */
router.get('/permissions', auth, getAuthenticatedUsersPermissions);

/**
 * Name: Email confirmation check
 * Method: GET
 * Auth: true
 * Role: 
 * Description: Check the authenticated user's email is confirmed
 */
router.get('/confirmed', auth, getAuthenticatedUsersConfirmation);

/**
 * Name: Update user
 * Method: PUT
 * Auth: true
 * Role: 
 * Description: Update authenticated user's information
 */
router.put('/', auth, require('./validators/update-user-validator'), require('./controllers/update-profile-controller'));

/**
 * Name: Create new user
 * Method: POST
 * Auth: true
 * Role: admin
 * Description: Create a new user account
 */
router.post('/', auth, hasRole('admin'), require('../auth/validators/registration-validator'), store);

/**
 * Name: Get users
 * Method: GET
 * Auth: true
 * Role: admin
 * Description: Get all user accounts
 */
router.get('/', auth, hasRole('admin'), index);

/**
 * Name: Get a user
 * Method: GET
 * Auth: true
 * Role: admin
 * Description: Get a particular user account
 */
router.get('/:user_id', auth, hasRole('admin'), show);

/**
 * Name: Update a user
 * Method: PUT
 * Auth: true
 * Role: admin
 * Description: Update a particular user account
 */
router.put('/:user_id', auth, hasRole('admin'), updateUserValidator, update);

/**
 * Name: Delete a user
 * Method: DELETE
 * Auth: true
 * Role: admin
 * Description: Remove a particular user account
 */
router.delete('/:user_id', auth, hasRole('admin'), remove);

/**
 * Name: Get user roles
 * Method: GET
 * Auth: true
 * Role: admin
 * Description: Get a user's roles
 */
router.get('/:user_id/roles', auth, hasRole('admin'), getUsersRoles); // TODO

/**
 * Name: Assign a role
 * Method: PUT
 * Auth: true
 * Role: admin
 * Description: Assign a role to a user
 */
router.put('/:user_id/roles/:role_name', auth, hasRole('admin'), assignRoleToUser); // TODO

/**
 * Name: Revoke a role
 * Method: DELETE
 * Auth: true
 * Role: admin
 * Description: Revoke a role from a user
 */
router.delete('/:user_id/roles/:role_name', auth, hasRole('admin'), revokeRoleFromUser); // TODO

/**
 * Name: User's permissions
 * Method: GET
 * Auth: true
 * Role: admin
 * Description: Get a user's permissions
 */
router.get('/:user_id/permissions', auth, hasRole('admin'), getUsersPermissions); // TODO

/**
 * Name: Email confirmation check
 * Method: GET
 * Auth: true
 * Role: admin
 * Description: Check a user's email is confirmed
 */
router.get('/:user_id/confirmed', auth, hasRole('admin'), getUsersConfirmation); // TODO

module.exports = router;
