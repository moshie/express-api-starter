'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const httpMocks = require('node-mocks-http')

const expect = chai.expect

const confirmationController = require('./confirmation-controller')
const ResponseException = require('../../../exceptions/response')

describe('Confirmation Controller', function () {

    it('responds 400 if no token was provided', function () {
        const request = httpMocks.createRequest({ method: 'GET', url: '/' })
        const response = httpMocks.createResponse()

        confirmationController(request, response)

        const body = JSON.parse(response._getData())

        expect(body).to.have.property('errors')
        expect(body.errors).to.have.deep.members([{
            status: '400',
            title: 'Invalid Token',
            detail: 'Confirmation Token is not provided'
        }])

        expect(response.statusCode).to.equal(400)
        expect(response._isEndCalled()).to.be.ok
        expect(response._isJSON()).to.be.ok
        expect(response._isUTF8()).to.be.ok
    })

    it('responds 200 with the confirmation status', function () {

        const mockedController = proxyquire('./confirmation-controller', {
            '../helpers/confirm-a-user': sinon.stub().resolves({ confirmed: true })
        })

        const response = httpMocks.createResponse()
        const request = { params: { token: 'token' } }

        return mockedController(request, response)
            .then(() => {
                const body = JSON.parse(response._getData())

                expect(body).to.have.deep.property('data', { confirmed: true })

                expect(response.statusCode).to.equal(200)
                expect(response._isEndCalled()).to.be.ok
                expect(response._isJSON()).to.be.ok
                expect(response._isUTF8()).to.be.ok
            })

    })

    it('responds with error code and the error in more detail', function () {

        const errorDetail = 'opps'
        const errorStatus = 500
        const error = new ResponseException(errorDetail, errorStatus)

        const mockedController = proxyquire('./confirmation-controller', {
            '../helpers/confirm-a-user': sinon.stub().rejects(error)
        })

        const response = httpMocks.createResponse()
        const request = { params: { token: 'token' } }
        
        return mockedController(request, response)
            .then(() => {
                var body = JSON.parse(response._getData())

                expect(body).to.have.property('errors')
                expect(body.errors).to.have.deep.members([{
                    status: `${errorStatus}`,
                    title: 'Failed to confirm user\'s email',
                    detail: errorDetail
                }])

                expect(response.statusCode).to.equal(errorStatus)
                expect(response._isEndCalled()).to.be.ok
                expect(response._isJSON()).to.be.ok
                expect(response._isUTF8()).to.be.ok
            })

    })

    it('responds with 500 if the error is not a response error', function () {

        const errorDetail = 'opps'
        const error = new Error(errorDetail)

        const mockedController = proxyquire('./confirmation-controller', {
            '../helpers/confirm-a-user': sinon.stub().rejects(error)
        })

        const response = httpMocks.createResponse()
        const request = { params: { token: 'token' } }

        return mockedController(request, response)
            .then(thing => {
                var body = JSON.parse(response._getData())

                expect(body).to.have.property('errors')
                expect(body.errors).to.have.deep.members([{
                    status: '500',
                    title: 'Failed to confirm user\'s email',
                    detail: errorDetail
                }])

                expect(response.statusCode).to.equal(500)
                expect(response._isEndCalled()).to.be.ok
                expect(response._isJSON()).to.be.ok
                expect(response._isUTF8()).to.be.ok
            })

    })

})
