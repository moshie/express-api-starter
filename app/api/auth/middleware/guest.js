'use strict'

/**
 * Stop authenticated users requesting guest endpoints
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
function authenticate(req, res, next) {

    if (typeof req.get('authorization') !== 'undefined') {
        return res.status(403).json({
            meta: { 
                message: 'You are not authorised to view this page'
            }
        })
    }

    next()
}

module.exports = authenticate
