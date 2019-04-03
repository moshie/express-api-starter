'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const httpMocks = require('node-mocks-http')

const expect = chai.expect

const User = require('../../../models/user')
const ResponseException = require('../../../exceptions/response')
const getUsers = require('./get-users')

describe('Get All Users', function () {

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

    it('gets all users', function () {

        var userModel = sinon.stub(User, 'find').yields(null, [fakeUser])

        return getUsers()
            .then((users) => {

                expect(userModel.calledWith({})).to.be.true
                expect(users).to.be.an.instanceof(Array)
                expect(users[0]).to.deep.equal(fakeUser)

                userModel.restore()
            })

    })

    it('should throw a ResponseException if an error occured', function () {
        var errorMessage = 'This is an error'

        var userModel = sinon.stub(User, 'find').yields(new ResponseException(errorMessage))

        return expect(getUsers()).to.be.eventually
            .rejectedWith(ResponseException, errorMessage).and.have.property('statusCode', 500)
            .then(() => userModel.restore())
    })

})
