'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const expect = chai.expect


describe('Add roles to a user', function () {

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

    it('Adds roles to a user', function () {
        const roles = ['admin'];
        const mockedController = proxyquire('./save-user-to-roles', {
            './get-user-by-id': sinon.stub().resolves(fakeUser),
            '../../roles/helpers/update-user-role': sinon.stub().resolves(fakeUser),
            '../../roles/helpers/get-role-by-name': sinon.stub().resolves({})
        })

        return expect(mockedController(fakeUser._id, roles)).to.eventually.be.an('array')
    })

})
