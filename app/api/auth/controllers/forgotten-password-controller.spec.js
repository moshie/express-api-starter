'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const httpMocks = require('node-mocks-http')

const expect = chai.expect

const forgottenPasswordController = require('./forgotten-password-controller')
const ResponseError = require('../../../error-handlers/response-error')
const check = require('express-validator/check')

describe('Confirmation Controller', function () {

    it('should return a 422 if there are validation errors', function () {
        const errors = {
            isEmpty: sinon.stub().returns(false),
            array: sinon.stub().returns('errors')
        }
        var validationResult = sinon.stub(check, 'validationResult').returns(errors)
        const response = httpMocks.createResponse()

        forgottenPasswordController({ body: { email: '' } }, response)

        var body = JSON.parse(response._getData())

        expect(errors.isEmpty.calledOnce).to.be.true
        expect(errors.array.calledOnce).to.be.true

        expect(body).to.have.property('errors', 'errors')

        expect(response.statusCode).to.equal(422)
        expect(response._isEndCalled()).to.be.ok
        expect(response._isJSON()).to.be.ok
        expect(response._isUTF8()).to.be.ok

        validationResult.restore()

    })

    it('sends the user a reset password email')

    it('responds 200 if all was ok')

    it('rejects with correct error code and response body')

    it('rejects with error code 500 if no error code defined')

})