'use strict'

function ResponseException(message, statusCode) {
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message
    this.statusCode = statusCode || 500
}

require('util').inherits(ResponseException, Error)

module.exports = ResponseException
