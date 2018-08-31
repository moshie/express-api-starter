'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const httpMocks = require('node-mocks-http')

const expect = chai.expect

const loginController = require('./login-controller')
const ResponseError = require('../../../error-handlers/response-error')
const check = require('express-validator/check')

describe('Login Controller', function () {

    it('should return a 422 if there are validation errors', function () {
        const errors = {
            isEmpty: sinon.stub().returns(false),
            array: sinon.stub().returns('errors')
        }
        var validationResult = sinon.stub(check, 'validationResult').returns(errors)
        const response = httpMocks.createResponse()

        loginController({}, response)

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

    it('should respond with 200 and the token if user authenticated successfully', function () {
        const errors = {
            isEmpty: sinon.stub().returns(true)
        }
        const validationResult = sinon.stub(check, 'validationResult').returns(errors)

        const mockedController = proxyquire('./login-controller', {
            '../helpers/generate-jwt': sinon.stub().resolves('token'),
            '../helpers/compare-passwords': sinon.stub().resolves(''),
            '../../users/helpers/get-user-by-email': sinon.stub().resolves('')
        })

        const request = httpMocks.createRequest({
            method: 'POST',
            url: '/'
        })

        const response = httpMocks.createResponse()

        return mockedController(request, response)
            .then(() => {
                expect(errors.isEmpty.calledOnce).to.be.true

                var body = JSON.parse(response._getData())

                expect(body).to.have.deep.property('data', {
                    token: 'token'
                })

                expect(response.statusCode).to.equal(200)
                expect(response._isEndCalled()).to.be.ok
                expect(response._isJSON()).to.be.ok
                expect(response._isUTF8()).to.be.ok

                validationResult.restore()
            })

    })

    it('rejects with correct error code and response body', function () {
        const errors = {
            isEmpty: sinon.stub().returns(true)
        }
        const validationResult = sinon.stub(check, 'validationResult').returns(errors)

        const errorDetail = 'opps'
        const errorStatus = 500
        const error = new ResponseError(errorDetail, errorStatus)

        const mockedController = proxyquire('./login-controller', {
            '../../users/helpers/get-user-by-email': sinon.stub().rejects(error)
        })

        const response = httpMocks.createResponse()
        
        return mockedController({ body: { email: ''} }, response)
            .then(thing => {
                var body = JSON.parse(response._getData())

                expect(body).to.have.property('errors')
                expect(body.errors).to.have.deep.members([{
                    status: `${errorStatus}`,
                    title: 'There was a problem authenticating',
                    detail: errorDetail
                }])

                expect(response.statusCode).to.equal(errorStatus)
                expect(response._isEndCalled()).to.be.ok
                expect(response._isJSON()).to.be.ok
                expect(response._isUTF8()).to.be.ok
                validationResult.restore()
            })

    })

    it('rejects with error code 500 if no error code defined', function () {
        const errors = {
            isEmpty: sinon.stub().returns(true)
        }
        const validationResult = sinon.stub(check, 'validationResult').returns(errors)

        const errorDetail = 'opps'
        const error = new Error(errorDetail)

        const mockedController = proxyquire('./login-controller', {
            '../../users/helpers/get-user-by-email': sinon.stub().rejects(error)
        })

        const response = httpMocks.createResponse()

        return mockedController({ body: { email: ''} }, response)
            .then(thing => {
                var body = JSON.parse(response._getData())

                expect(response.statusCode).to.equal(500)
                validationResult.restore()
            })
    })

})