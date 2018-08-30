'use strict'

const chai = require('chai')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

const findPossibleExistingPasswordReset = require('./find-possible-existing-password-reset')
const ResponseError = require('../../../error-handlers/response-error')
const PasswordResets = require('../../../models/password-resets')

describe('Find possible password reset by email', function () {

    beforeEach(function() {
        sinon.stub(PasswordResets, 'findOne')
    })

    afterEach(function() {
        PasswordResets.findOne.restore()
    })

    it('should return a promise', function () {
        expect(findPossibleExistingPasswordReset('example@test.com')).to.be.a('promise')
    })

    it('should resolve with a document', function () {
        const doc = { _id: 'testing' }
        PasswordResets.findOne.yields(null, doc)

        return expect(findPossibleExistingPasswordReset('example@test.com')).to.eventually.to.be.an('object').and.to.have.property('_id', doc._id)
    })

    it('should resolve with null if no document exists', function () {
        PasswordResets.findOne.yields(null, null)

        return expect(findPossibleExistingPasswordReset('example@test.com')).to.eventually.to.be.null
    })

    it('should reject with a 500 response error', function () {
        const errorMessage = 'opps something went wrong'
        PasswordResets.findOne.yields(new Error(errorMessage), null)

        return expect(findPossibleExistingPasswordReset('example@test.com')).to.be.eventually.rejectedWith(ResponseError, errorMessage).and.have.property('statusCode', 500)
    })

})
