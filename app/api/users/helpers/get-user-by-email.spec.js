'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const httpMocks = require('node-mocks-http')

const expect = chai.expect

const User = require('../../../models/user')
const ResponseException = require('../../../exceptions/response')
const getUserByEmail = require('./get-user-by-email')

describe('Get User By Email', function () {

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

    it('gets the user based on the email passed', function () {
        var email = 'example@mail.com';

        var userModel = sinon.stub(User, 'findOne').returns({
            populate: sinon.stub().returns({
                exec: sinon.stub().yields(null, fakeUser)
            })
        })

        return getUserByEmail(email)
            .then((user) => {

                expect(userModel.calledWith({ email: email })).to.be.true
                expect(user).to.deep.equal(fakeUser)

                userModel.restore()
            })

    })

    it('should throw a ResponseException if an error occured', function () {
        var email = 'example@mail.com'
        var errorMessage = 'This is an error'

        var userModel = sinon.stub(User, 'findOne').returns({
            populate: sinon.stub().returns({
                exec: sinon.stub().yields(new ResponseException(errorMessage))
            })
        })

        return expect(getUserByEmail(email)).to.be.eventually
            .rejectedWith(ResponseException, errorMessage).and.have.property('statusCode', 500)
            .then(() => userModel.restore())
    })

    it('should throw a ResponseException if the user is not found', function () {
        var email = 'example@mail.com'
        var errorMessage = 'User Not Found'

        var userModel = sinon.stub(User, 'findOne').returns({
            populate: sinon.stub().returns({
                exec: sinon.stub().yields(null, null)
            })
        })

        return expect(getUserByEmail(email)).to.be.eventually
            .rejectedWith(ResponseException, errorMessage).and.have.property('statusCode', 404)
            .then(() => userModel.restore())
    })

})
