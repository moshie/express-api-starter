"use strict";

function authenticate(req, res, next) {

    if (req.get('authorization')) {
        return res.status(403).json({
            meta: { 
                message: 'You are not authorised to view this page'
            }
        });
    }

    next();
}

module.exports = authenticate;
