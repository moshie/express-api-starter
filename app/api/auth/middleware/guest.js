"use strict";

function authenticate(req, res, next) {

    function badRequest(message = 'Bad Request') {
        res.status(400).json({
            data: { message }
        });
    }

    if (req.get('authorization')) {
        return badRequest();
    }

}

module.exports = authenticate;
