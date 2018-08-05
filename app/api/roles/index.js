"use strict";

const express = require('express');
const router = express.Router();

// Validator
//
const roleValidator = require('./validators/role-validator');
const usersRoleValidator = require('./validators/users-role-validator');

// Controllers
//
const {
    store,
    index,
    show,
    update,
    remove
} = require('./controllers/resource-controller');
const rolesPermissionsController = require('./controllers/roles-permissions-controller');
const usersRolesController = require('./controllers/users-roles-controller');
const assignRoleController = require('./controllers/assign-role-controller');
const revokeRoleController = require('./controllers/revoke-role-controller');

// Middleware
//
const authenticate = require('../auth/middleware/authenticate');
// const hasPermission = require('../permissions/middleware/has-permission');
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
router.delete('/:role_name', authenticate, hasRole('admin'), remove);

/* GET role permissions */
router.get('/:role_name/permissions', authenticate, hasRole('admin'), rolesPermissionsController);

/* PUT role users */
router.put('/:role_name/users', authenticate, hasRole('admin'), usersRoleValidator, usersRolesController);

/* PUT role user */
router.put('/:role_name/users/:email', authenticate, hasRole('admin'), assignRoleController);

/* DELETE role user */
router.delete('/:role_name/users/:email', authenticate, hasRole('admin'), revokeRoleController);

module.exports = router;
