'use strict'

const chai = require('chai')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

const comparePasswords = require('./compare-passwords')
const ResponseException = require('../../../exceptions/response')
const bcrypt = require('bcrypt')

describe('Compare Passwords', function () {

    beforeEach(function() {
        sinon.stub(bcrypt, 'compare')
    })

    afterEach(function() {
        bcrypt.compare.restore()
    })

    it('should return a promise', function () {
        expect(comparePasswords({
            _id: 'thisisanID', 
            password: 'testing'
        })).to.be.a('promise')
    })

    it('should resolve with a user', function () {
        var user = {
            _id: 'thisisanID', 
            password: 'testing'
        }
        bcrypt.compare.yields(null, true)

        return expect(comparePasswords(user, 'testing')).to.eventually.be.an('object').and.have.property('_id', 'thisisanID')
    })

    it('should reject with a 500 response error if error occurs', function () {
        var user = {
            _id: 'thisisanID', 
            password: 'testing'
        }
        var errorMessage = 'opps an error occured'
        bcrypt.compare.yields(new Error(errorMessage))

        return expect(comparePasswords(user, 'testing')).to.be.eventually.rejectedWith(ResponseException, errorMessage).and.have.property('statusCode', 500)
    })

    it('should reject with a 401 response error if user pass does not match', function () {
        var user = {
            _id: 'thisisanID', 
            password: 'test'
        }
        bcrypt.compare.yields(null, false)

        return expect(comparePasswords(user, 'testing')).to.be.eventually.rejectedWith(ResponseException, 'Unauthorized').and.have.property('statusCode', 401)
    })

})
