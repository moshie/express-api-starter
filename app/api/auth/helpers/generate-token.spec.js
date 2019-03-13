'use strict'

const chai = require('chai')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

const generateToken = require('./generate-token')
const ResponseError = require('../../../error-handlers/response-error')
const crypto = require('crypto')

describe('Generate Password Reset Token', function () {

    beforeEach(function() {
        sinon.stub(crypto, 'randomBytes')
    })

    afterEach(function() {
        crypto.randomBytes.restore()
    })

    it('should return a promise', function () {
        expect(generateToken()).to.be.a('promise')
    })

    it('should resolve with a token', function () {
        var bufferedToken = Buffer.from('hello')
        crypto.randomBytes.yields(null, bufferedToken)

        return expect(generateToken()).to.eventually.be.a('string').and.to.equal(bufferedToken.toString('hex'))
    })

    it('should reject with a response error', function () {
        var errorMessage = 'opps an error occured'
        crypto.randomBytes.yields(new Error(errorMessage))

        return expect(generateToken()).to.be.eventually.rejectedWith(ResponseError, errorMessage).and.have.property('statusCode', 500)
    })

})
