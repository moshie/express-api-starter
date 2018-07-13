"use strict";

const { validationResult } = require('express-validator/check')

function storeController(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.mapped()
        });
    }

    res.status(200).json({
        data: {
            message: "hello world"
        }
    });
}

module.exports = storeController;
