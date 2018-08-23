"use strict";

function authenticate(req, res, next) {

    function badRequest(message = 'Bad Request') {
        res.status(403).json({
            data: { message }
        });
    }

    if (req.get('authorization')) {
        return badRequest('You are not authorised to view this page');
    }

    next();
}

module.exports = authenticate;
