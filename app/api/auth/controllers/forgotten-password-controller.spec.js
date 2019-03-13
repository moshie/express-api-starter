'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const httpMocks = require('node-mocks-http')

const expect = chai.expect

const forgottenPasswordController = require('./forgotten-password-controller')
const ResponseError = require('../../../error-handlers/response-error')
const check = require('express-validator/check')

describe('Forgotten Password Controller', function () {

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

    it('sends the user a reset password email', function () {
        const errors = {
            isEmpty: sinon.stub().returns(true)
        }
        var validationResult = sinon.stub(check, 'validationResult').returns(errors)
        const response = httpMocks.createResponse()

        const mockedSendMail = sinon.stub().resolves({ data: 'email delivered' })

        const mockedController = proxyquire('./forgotten-password-controller', {
            '../helpers/find-possible-existing-password-reset': sinon.stub().resolves({}),
            '../helpers/generate-token': sinon.stub().resolves('token'),
            '../helpers/update-password-reset': sinon.stub().resolves({ token: 'token' }),
            '../../../services/mailer-service': () => ({ sendMail: mockedSendMail })
        })

        return mockedController({ body: { email: 'test@testing.com' } }, response)
            .then(() => {
                expect(errors.isEmpty.calledOnce).to.be.true

                expect(mockedSendMail.args[0][0]).to.deep.equal({
                    from: 'website@example.com',
                    to: 'test@testing.com',
                    subject: 'Forgotten Password',
                    html: 'token'
                })

                expect(mockedSendMail.calledOnce).to.be.true

                validationResult.restore()
            })
    })

    it('responds 200 if all was ok', function () {
        const errors = {
            isEmpty: sinon.stub().returns(true)
        }
        var validationResult = sinon.stub(check, 'validationResult').returns(errors)
        const response = httpMocks.createResponse()

        const mockedSendMail = sinon.stub().resolves({ data: 'email delivered' })

        const mockedController = proxyquire('./forgotten-password-controller', {
            '../helpers/find-possible-existing-password-reset': sinon.stub().resolves({}),
            '../helpers/generate-token': sinon.stub().resolves('token'),
            '../helpers/update-password-reset': sinon.stub().resolves({ token: 'token' }),
            '../../../services/mailer-service': () => ({ sendMail: mockedSendMail })
        })

        return mockedController({ body: { email: 'test@testing.com' } }, response)
            .then(() => {
                var body = JSON.parse(response._getData())

                expect(body).to.have.deep.property('meta', {
                    info: { data: 'email delivered' },
                    message: 'Forgotten Password E-mail sent successfully'
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

        const mockedController = proxyquire('./forgotten-password-controller', {
            '../helpers/find-possible-existing-password-reset': sinon.stub().rejects(error)
        })

        const response = httpMocks.createResponse()
        
        return mockedController({ body: { email: 'testing@test.com' } }, response)
            .then(thing => {
                var body = JSON.parse(response._getData())

                expect(body).to.have.property('errors')
                expect(body.errors).to.have.deep.members([{
                    status: `${errorStatus}`,
                    title: 'There was a problem attempting to send a reset password email',
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

        const mockedController = proxyquire('./forgotten-password-controller', {
            '../helpers/find-possible-existing-password-reset': sinon.stub().rejects(error)
        })

        const response = httpMocks.createResponse()

        return mockedController({ body: { email: 'test@testing.com' } }, response)
            .then(() => {
                var body = JSON.parse(response._getData())

                expect(response.statusCode).to.equal(500)
                validationResult.restore()
            })
    })

})