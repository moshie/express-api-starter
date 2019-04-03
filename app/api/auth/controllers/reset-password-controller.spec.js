'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const httpMocks = require('node-mocks-http')

const expect = chai.expect

const resetPasswordController = require('./reset-password-controller')
const ResponseException = require('../../../exceptions/response')
const check = require('express-validator/check')
const bcrypt = require('bcrypt')

describe('Reset Password Controller', function () {

    const exampleRequestBody = {
        email: 'hello@example.com',
        token: '1AmAT0k3n',
        password: 'newPassword'
    }

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

    it('should return a 422 if there are validation errors', function () {
        const errors = {
            isEmpty: sinon.stub().returns(false),
            array: sinon.stub().returns('errors')
        }
        var validationResult = sinon.stub(check, 'validationResult').returns(errors)

        const response = httpMocks.createResponse()
        const request = httpMocks.createRequest({
            method: 'POST',
            url: '/reset',
            body: exampleRequestBody
        })

        resetPasswordController(request, response)

        var data = JSON.parse(response._getData())

        expect(errors.isEmpty.calledOnce).to.be.true
        expect(errors.array.calledOnce).to.be.true

        expect(data).to.have.property('errors', 'errors')

        expect(response.statusCode).to.equal(422)
        expect(response._isEndCalled()).to.be.ok
        expect(response._isJSON()).to.be.ok
        expect(response._isUTF8()).to.be.ok

        validationResult.restore()
    })

    it('should save an updated hashed password to the user', function () {
        const errors = { isEmpty: sinon.stub().returns(true) }
        var validationResult = sinon.stub(check, 'validationResult').returns(errors)

        var encryption = sinon.stub(bcrypt, 'hash').resolves('HashedPassword')
        var mockedSendMail = sinon.stub().resolves({ data: 'email delivered' })
        var resetUserPassword = sinon.stub().resolves(fakeUser)
        var deletePasswordResetEntry = sinon.stub().resolves(fakeUser)

        const response = httpMocks.createResponse()
        const request = httpMocks.createRequest({
            method: 'POST',
            url: '/reset',
            body: exampleRequestBody
        })

        const mockedController = proxyquire('./reset-password-controller', {
            '../helpers/find-password-reset-by-email-and-token': sinon.stub().resolves({}),
            '../../users/helpers/get-user-by-email': sinon.stub().resolves(fakeUser),
            '../helpers/reset-user-password': resetUserPassword,
            '../helpers/delete-password-reset-entry': deletePasswordResetEntry,
            '../../../services/mailer-service': () => ({ sendMail: mockedSendMail })
        })

        return mockedController(request, response)
            .then(() => {

                expect(encryption.args[0][0]).to.equal(exampleRequestBody.password)
                expect(encryption.args[0][1]).to.equal(10)
                expect(encryption.calledOnce).to.be.true

                expect(resetUserPassword.args[0][0][0]).to.deep.equal(fakeUser)
                expect(resetUserPassword.args[0][0][1]).to.equal('HashedPassword')
                expect(resetUserPassword.calledOnce).to.be.true

                expect(deletePasswordResetEntry.args[0][0]).to.deep.equal(fakeUser)
                expect(deletePasswordResetEntry.calledOnce).to.be.true

                expect(mockedSendMail.args[0][0]).to.deep.equal({
                    from: 'website@example.com',
                    to: fakeUser.email,
                    subject: 'Password Updated',
                    html: `${fakeUser.full_name} your password has been updated`
                })

                // Response
                const body = JSON.parse(response._getData())
                expect(body).to.have.property('data')
                expect(body.data).to.deep.include({
                    type: 'user',
                    id: fakeUser._id
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
                expect(response.statusCode).to.equal(200)
                expect(response._isEndCalled()).to.be.ok
                expect(response._isJSON()).to.be.ok
                expect(response._isUTF8()).to.be.ok

                validationResult.restore()
                encryption.restore()
            })
    })


    it('rejects with correct error code and response body', function () {
        const errors = { isEmpty: sinon.stub().returns(true) }
        var validationResult = sinon.stub(check, 'validationResult').returns(errors)

        const response = httpMocks.createResponse()
        const request = httpMocks.createRequest({
            method: 'POST',
            url: '/reset',
            body: exampleRequestBody
        })

        const mockedController = proxyquire('./reset-password-controller', {
            '../helpers/find-password-reset-by-email-and-token': sinon.stub().rejects(new Error('Error Message'))
        })

        return mockedController(request, response)
            .then(() => {
                
                // Validation
                expect(validationResult.calledOnce).to.be.true
                expect(validationResult.calledWith(request)).to.be.true
                expect(errors.isEmpty.calledOnce).to.be.true

                const body = JSON.parse(response._getData())
                expect(body).to.have.property('errors')
                expect(body.errors).to.have.deep.members([{
                    status: '500',
                    title: 'There was a problem reseting the password',
                    detail: 'Error Message'
                }])
                expect(response.statusCode).to.equal(500)
                expect(response._isEndCalled()).to.be.ok
                expect(response._isJSON()).to.be.ok
                expect(response._isUTF8()).to.be.ok

                // Restore Stubs
                validationResult.restore()
            })
    })

})