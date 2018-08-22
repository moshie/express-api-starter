"use strict";

const { validationResult } = require('express-validator/check');

exports.assignMultiple = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    // ---

}

exports.assignSingular = function (req, res) {

    // ---

}
