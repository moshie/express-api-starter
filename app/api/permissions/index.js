"use strict";

const express = require('express');
const router = express.Router();

const { store, index, show, update, remove } = require('./controllers/resource-controller');
const { assignMultiple, assignSingular } = require('./controllers/role-assignment-controller');
const { revokeMultiple, revokeSingular } = require('./controllers/role-revoke-controller');

const auth = require('../auth/middleware/authenticate');
// const guestMiddleware = require('../auth/middleware/guest');
// const hasPermission = require('./middleware/has-permission');
const hasRole = require('../roles/middleware/has-role');

/**
 * Name: Create a permission
 * Method: POST
 * Auth: true
 * Role: admin
 * Description: Create a new permission
 */
router.post('/', auth, hasRole('admin'), require('./validators/permission-validator'), store);

/**
 * Name: Get permissions
 * Method: GET
 * Auth: true
 * Role: admin
 * Description: Get all permissions
 */
router.get('/', auth, hasRole('admin'), index);

/**
 * Name: Get a permission
 * Method: GET
 * Auth: true
 * Role: admin
 * Description: Get a particular permission
 */
router.get('/:permission_name', auth, hasRole('admin'), show);

/**
 * Name: Update a permission
 * Method: PUT
 * Auth: true
 * Role: admin
 * Description: Update a particular permission
 */
router.put('/:permission_name', auth, hasRole('admin'), require('./validators/permission-validator'), update);

/**
 * Name: Remove a permission
 * Method: DELETE
 * Auth: true
 * Role: admin
 * Description: Remove a particular permission
 */
router.delete('/:permission_name', auth, hasRole('admin'), remove);

/**
 * Name: Assign permission to roles
 * Method: PUT
 * Auth: true
 * Role: admin
 * Description: Assign a permission to multiple roles
 */
router.put('/:permission_name/roles', auth, hasRole('admin'), require('./validators/role-validator'), assignMultiple); // TODO

/**
 * Name: Assign permission to a role
 * Method: PUT
 * Auth: true
 * Role: admin
 * Description: Assign a permission to a role
 */
router.put('/:permission_name/roles/:role_name', auth, hasRole('admin'), assignSingular); // TODO

/**
 * Name: Revoke permission from roles
 * Method: DELETE
 * Auth: true
 * Role: admin
 * Description: Revoke a permission from multiple roles
 */
router.delete('/:permission_name/roles', auth, hasRole('admin'), require('./validators/role-validator'), revokeMultiple); // TODO

/**
 * Name: Revoke permission from role
 * Method: DELETE
 * Auth: true
 * Role: admin
 * Description: Revoke a permission from a role
 */
router.delete('/:permission_name/roles/:role_name', auth, hasRole('admin'), revokeSingular); // TODO

module.exports = router;
