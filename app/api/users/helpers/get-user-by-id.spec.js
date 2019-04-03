'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const httpMocks = require('node-mocks-http')

const expect = chai.expect

const User = require('../../../models/user')
const ResponseException = require('../../../exceptions/response')
const getUserById = require('./get-user-by-id')

describe('Get User By Id', function () {

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

    it('gets the user based on the id passed', function () {
        var id = 'id'

        var userModel = sinon.stub(User, 'findById').returns({
            populate: sinon.stub().returns({
                exec: sinon.stub().yields(null, fakeUser)
            })
        })

        return getUserById(id)
            .then((user) => {

                expect(userModel.calledWith(id)).to.be.true
                expect(user).to.deep.equal(fakeUser)

                userModel.restore()
            })

    })

    it('should throw a ResponseException if an error occured', function () {
        var id = 'id'
        var errorMessage = 'This is an error'

        var userModel = sinon.stub(User, 'findById').returns({
            populate: sinon.stub().returns({
                exec: sinon.stub().yields(new ResponseException(errorMessage))
            })
        })

        return expect(getUserById(id)).to.be.eventually
            .rejectedWith(ResponseException, errorMessage).and.have.property('statusCode', 500)
            .then(() => userModel.restore())
    })

    it('should throw a ResponseException if the user is not found', function () {
        var id = 'id'
        var errorMessage = 'User Not Found'

        var userModel = sinon.stub(User, 'findById').returns({
            populate: sinon.stub().returns({
                exec: sinon.stub().yields(null, null)
            })
        })

        return expect(getUserById(id)).to.be.eventually
            .rejectedWith(ResponseException, errorMessage).and.have.property('statusCode', 404)
            .then(() => userModel.restore())
    })

})
