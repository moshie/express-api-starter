const express = require('express');
const router = express.Router();

const storeValidator = require('./validators/store-validator');

const storeController = require('./controllers/store-controller');

// Needs Auth

/* POST store */
router.post('/', storeValidator, storeController);

// is_confirmed

module.exports = router;
