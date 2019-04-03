'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const expect = chai.expect


describe('Revoke User from roles', function () {

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

    it('removes roles from user', function () {
        const roles = ['admin'];
        const mockedController = proxyquire('./revoke-user-from-roles', {
            '../helpers/get-user-by-id': sinon.stub().resolves(fakeUser),
            '../../roles/helpers/remove-user-role': sinon.stub().resolves(fakeUser),
            '../../roles/helpers/get-role-by-name': sinon.stub().resolves({})
        })

        return expect(mockedController(fakeUser._id, roles)).to.eventually.be.an('array')
    })

})
