"use strict";

const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

const findPasswordResetByEmailAndToken = require('./find-password-reset-by-email-and-token');
const ResponseError = require('../../../error-handlers/response-error');
const PasswordResets = require('../../../models/password-resets');

describe('Find password reset by email and token', function () {

    beforeEach(function() {
        sinon.stub(PasswordResets, 'findOne');
    });

    afterEach(function() {
        PasswordResets.findOne.restore();
    });

    it('should return a promise', function () {
        expect(findPasswordResetByEmailAndToken('example@test.com', 'token')).to.be.a('promise');
    });

    it('should resolve with a token', function () {
        const doc = { _id: 'testing' };
        PasswordResets.findOne.yields(null, doc);

        return expect(findPasswordResetByEmailAndToken('example@test.com', 'token')).to.eventually.to.be.an('object').and.to.have.property('_id', doc._id);
    });

    it('should reject with a 500 response error', function () {
        const errorMessage = 'opps something went wrong';
        PasswordResets.findOne.yields(new Error(errorMessage), null);

        return expect(findPasswordResetByEmailAndToken('example@test.com', 'token')).to.be.eventually.rejectedWith(ResponseError, errorMessage).and.have.property('statusCode', 500);
    });

    it('should reject with a 422 response error if no entry was found', function () {
        PasswordResets.findOne.yields(null, null);

        return expect(findPasswordResetByEmailAndToken('example@test.com', 'token')).to.be.eventually.rejectedWith(ResponseError, 'Invalid Token').and.have.property('statusCode', 422);
    });

});
