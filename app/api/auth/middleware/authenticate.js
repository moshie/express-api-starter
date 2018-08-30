'use strict'

const jwt = require('jsonwebtoken')
const authorization = require('auth-header')

function authenticate(req, res, next) {

    function badRequest(message = 'Bad Request') {
        res.status(400).json({
            data: { message }
        })
    }

    try {
        var auth = authorization.parse(req.get('authorization'))
    } catch (err) {
        return badRequest()
    }

    if (auth.scheme !== 'Bearer') {
        return badRequest()
    }

    jwt.verify(auth.token, process.env.JWT_SECRET, function (_err, decoded) {
        if (_err || typeof decoded === 'undefined') {
            return res.status(403).json({
                data: { message: 'Forbidden' }
            })
        }

        res.locals.authenticated = true
        res.locals.token = decoded

        next()
    })
}

module.exports = authenticate
