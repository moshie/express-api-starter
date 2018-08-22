"use strict";

const express = require('express');
const router = express.Router();

const { store, index, show, update, remove } = require('./controllers/resource-controller');
const { assignMultiple, assignSingular } = require('./controllers/assignment-controller');
const { revokeMultiple, revokeSingular } = require('./controllers/revoke-controller');

const auth = require('../auth/middleware/authenticate');
// const hasPermission = require('../permissions/middleware/has-permission');
const hasRole = require('./middleware/has-role');

/**
 * Name: Create a role
 * Method: POST
 * Auth: true
 * Role: admin
 * Description: Create a new role
 */
router.post('/', auth, hasRole('admin'), require('./validators/role-validator'), store);

/**
 * Name: Get roles
 * Method: GET
 * Auth: true
 * Role: admin
 * Description: Get all roles
 */
router.get('/', auth, hasRole('admin'), index);

/**
 * Name: Get a role
 * Method: GET
 * Auth: true
 * Role: admin
 * Description: Get a particular role
 */
router.get('/:role_name', auth, hasRole('admin'), show);

/**
 * Name: Update a role
 * Method: PUT
 * Auth: true
 * Role: admin
 * Description: Update a particular role
 */
router.put('/:role_name', auth, hasRole('admin'), require('./validators/role-validator'), update);

/**
 * Name: Remove a role
 * Method: DELETE
 * Auth: true
 * Role: admin
 * Description: Remove a particular role
 */
router.delete('/:role_name', auth, hasRole('admin'), remove);

/**
 * Name: Role permissions
 * Method: GET
 * Auth: true
 * Role: admin
 * Description: Get permissions on a role
 */
router.get('/:role_name/permissions', auth, hasRole('admin'), require('./controllers/permissions-controller'));

/**
 * Name: Assign role to users
 * Method: PUT
 * Auth: true
 * Role: admin
 * Description: Assign a role to multiple users
 */
router.put('/:role_name/users', auth, hasRole('admin'), require('./validators/users-validator'), assignMultiple);

/**
 * Name: Assign role to user
 * Method: PUT
 * Auth: true
 * Role: admin
 * Description: Assign a role to a user
 */
router.put('/:role_name/users/:user_id', auth, hasRole('admin'), assignSingular);

/**
 * Name: Revoke role from users
 * Method: DELETE
 * Auth: true
 * Role: admin
 * Description: Revoke a role from multiple users
 */
router.delete('/:role_name/users', auth, hasRole('admin'), require('./validators/users-validator'), revokeMultiple);

/**
 * Name: Revoke role from user
 * Method: DELETE
 * Auth: true
 * Role: admin
 * Description: Revoke a role from a user
 */
router.delete('/:role_name/users/:user_id', auth, hasRole('admin'), revokeSingular);

module.exports = router;
