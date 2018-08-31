'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const httpMocks = require('node-mocks-http')

const expect = chai.expect

const registrationController = require('./registration-controller')
const ResponseError = require('../../../error-handlers/response-error')
const check = require('express-validator/check')
const User = require('../../../models/user')

describe('Registration Controller', function () {

    const fakeUser = {
        _id: 'id',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@test.com',
        password: 'securePassw0rd',
        confirmed: true,
        confirmation_token: 'confirmationToken',
        created_at: '',
        updated_at: ''
    };

    const request = httpMocks.createRequest({
        method: 'post',
        url: '/api/v1/auth/register',
        body: {
            first_name: fakeUser.first_name,
            last_name: fakeUser.last_name,
            email: fakeUser.email,
            password: fakeUser.password,
            password_confirmation: fakeUser.password
        }
    })

    it('responds with a 422 on validation failure', function () {
        const errors = {
            isEmpty: sinon.stub().returns(false),
            array: sinon.stub().returns('errors')
        }
        const validationResult = sinon.stub(check, 'validationResult').returns(errors)
        const response = httpMocks.createResponse()

        registrationController(request, response)

        // Validation
        expect(validationResult.calledOnce).to.be.true
        expect(validationResult.calledWith(request)).to.be.true
        expect(errors.isEmpty.calledOnce).to.be.true
        expect(errors.array.calledOnce).to.be.true

        // Response
        const body = JSON.parse(response._getData())
        expect(body).to.have.property('errors', 'errors')
        expect(response.statusCode).to.equal(422)
        expect(response._isEndCalled()).to.be.ok
        expect(response._isJSON()).to.be.ok
        expect(response._isUTF8()).to.be.ok

        validationResult.restore()
    })

    it('Sends the new user a confirmation email', function () {
        const errors = { isEmpty: sinon.stub().returns(true) }
        const validationResult = sinon.stub(check, 'validationResult').returns(errors)
        const response = httpMocks.createResponse()
        const userStub = sinon.stub(User.prototype, 'save').resolves(fakeUser)
        const sentStub = sinon.stub()
        const registrationController = proxyquire('./registration-controller', {
            '../../../services/mailer-service': sinon.stub().returns({
                sendMail: sentStub
            })
        })

        return registrationController(request, response)
            .then(() => {

                // Validation
                expect(validationResult.calledOnce).to.be.true
                expect(validationResult.calledWith(request)).to.be.true
                expect(errors.isEmpty.calledOnce).to.be.true

                // Save the user
                expect(userStub.calledOnce).to.be.true

                // Email
                expect(sentStub.calledOnce).to.be.true
                expect(sentStub.args[0][0]).to.deep.include({
                    from: 'website@example.com',
                    to: fakeUser.email
                })
                expect(sentStub.args[0][0].html).to.include(fakeUser.confirmation_token)

                // Restore Stubs
                validationResult.restore()
                userStub.restore()
            })

    })

    it('responds with the user resource and a 201 response', function () {
        const errors = { isEmpty: sinon.stub().returns(true) }
        const validationResult = sinon.stub(check, 'validationResult').returns(errors)
        const response = httpMocks.createResponse()
        const userStub = sinon.stub(User.prototype, 'save').resolves(fakeUser)
        const registrationController = proxyquire('./registration-controller', {
            '../../../services/mailer-service': sinon.stub().returns({
                sendMail: sinon.stub()
            })
        })

        return registrationController(request, response)
            .then(() => {

                // Validation
                expect(validationResult.calledOnce).to.be.true
                expect(validationResult.calledWith(request)).to.be.true
                expect(errors.isEmpty.calledOnce).to.be.true

                // Response
                const body = JSON.parse(response._getData())
                expect(body).to.have.property('data')
                expect(body.data).to.deep.include({
                    type: 'user',
                    id: 'id'
                })
                expect(body.data).to.have.property('attributes')
                expect(body.data.attributes).to.deep.include({
                    first_name: fakeUser.first_name,
                    last_name: fakeUser.last_name,
                    email: fakeUser.email,
                    confirmed: fakeUser.confirmed,
                    created_at: fakeUser.created_at,
                    updated_at: fakeUser.updated_at
                })
                expect(response.statusCode).to.equal(201)
                expect(response._isEndCalled()).to.be.ok
                expect(response._isJSON()).to.be.ok
                expect(response._isUTF8()).to.be.ok

                // Restore Stubs
                validationResult.restore()
                userStub.restore()
            })

    })

    it('rejects with correct error code and response body', function () {
        const errors = { isEmpty: sinon.stub().returns(true) }
        const validationResult = sinon.stub(check, 'validationResult').returns(errors)
        const response = httpMocks.createResponse()
        const errorDetail = 'oops';
        const userStub = sinon.stub(User.prototype, 'save').rejects(new ResponseError(errorDetail, 500));

        return registrationController(request, response)
            .then(() => {

                // Validation
                expect(validationResult.calledOnce).to.be.true
                expect(validationResult.calledWith(request)).to.be.true
                expect(errors.isEmpty.calledOnce).to.be.true

                // Response
                const body = JSON.parse(response._getData())
                expect(body).to.have.property('errors')
                expect(body.errors).to.have.deep.members([{
                    status: `500`,
                    title: 'There was a problem registering',
                    detail: errorDetail
                }])
                expect(response.statusCode).to.equal(500)
                expect(response._isEndCalled()).to.be.ok
                expect(response._isJSON()).to.be.ok
                expect(response._isUTF8()).to.be.ok

                // Restore Stubs
                validationResult.restore()
                userStub.restore()
            })
    })

    it('rejects with error code 500 if no error code defined')

    it('defaults last name to an empty string')

})