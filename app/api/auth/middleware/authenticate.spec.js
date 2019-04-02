'use strict'

const { expect } = require('chai')
const sinon = require('sinon')
const httpMocks = require('node-mocks-http')

const authenticateMiddleware = require('./authenticate')
const authorization = require('auth-header')
const jwt = require('jsonwebtoken')

describe('Authenticate Middleware', function () {

    it('should Authenticate the Request', function (cb) {
        var token = '1amAT0k3n';
        var jsonWebToken = sinon.stub(jwt, 'verify').yields(null, token)
        var auth = sinon.stub(authorization, 'parse').returns({ scheme: 'Bearer', token: token })
        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/',
            headers: { authorization: `Bearer ${token}` }
        })
        const response = httpMocks.createResponse()

        var next = () => {
            expect(auth.calledOnce).to.be.true
            // expect(auth).to.equal('Bearer')
            expect(jsonWebToken.calledOnce).to.be.true

            expect(response.locals.authenticated).to.be.true
            expect(response.locals.token).to.equal(token)

            auth.restore()
            jsonWebToken.restore()

            cb()
        }

        authenticateMiddleware(request, response, next)

    })

    it('should throw 400 status code if the token is invalid', function () {
        var token = '1amAT0k3n';
        var auth = sinon.stub(authorization, 'parse').throws(new Error('opps'))
        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/',
            headers: { authorization: `Bearer ${token}` }
        })
        const response = httpMocks.createResponse()

        authenticateMiddleware(request, response, () => {})

        expect(auth.calledOnce).to.be.true

        const body = JSON.parse(response._getData())
        expect(body).to.have.property('data')
        expect(body.data).to.deep.include({ message: 'Bad Request' })
        expect(response.statusCode).to.equal(400)
        expect(response._isEndCalled()).to.be.ok
        expect(response._isJSON()).to.be.ok
        expect(response._isUTF8()).to.be.ok

        auth.restore()
    })

    it('should throw 400 status code if the token is not a bearer type', function () {
        var token = '1amAT0k3n';
        var auth = sinon.stub(authorization, 'parse').returns({ scheme: 'fail' })
        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/',
            headers: { authorization: `fail ${token}` }
        })
        const response = httpMocks.createResponse()

        authenticateMiddleware(request, response, () => {})

        expect(auth.calledOnce).to.be.true

        const body = JSON.parse(response._getData())
        expect(body).to.have.property('data')
        expect(body.data).to.deep.include({ message: 'Bad Request' })
        expect(response.statusCode).to.equal(400)
        expect(response._isEndCalled()).to.be.ok
        expect(response._isJSON()).to.be.ok
        expect(response._isUTF8()).to.be.ok

        auth.restore()
    })

    it('should throw 403 status code if forbbiden', function () {
        var token = '1amAT0k3n';
        var jsonWebToken = sinon.stub(jwt, 'verify').yields(new Error('Forbidden'))
        var auth = sinon.stub(authorization, 'parse').returns({ scheme: 'Bearer', token: token })
        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/',
            headers: { authorization: `Bearer ${token}` }
        })
        const response = httpMocks.createResponse()

        authenticateMiddleware(request, response, () => {})

        expect(auth.calledOnce).to.be.true
        expect(jsonWebToken.calledOnce).to.be.true

        const body = JSON.parse(response._getData())
        expect(body).to.have.property('data')
        expect(body.data).to.deep.include({ message: 'Forbidden' })
        expect(response.statusCode).to.equal(403)
        expect(response._isEndCalled()).to.be.ok
        expect(response._isJSON()).to.be.ok
        expect(response._isUTF8()).to.be.ok

        auth.restore()
        jsonWebToken.restore()
    })

})