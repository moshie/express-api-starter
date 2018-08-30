'use strict'

function ResponseError(message, statusCode) {
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message
    this.statusCode = statusCode || 500
}

require('util').inherits(ResponseError, Error)

module.exports = ResponseError
