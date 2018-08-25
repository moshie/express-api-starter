"use strict";

const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

const PasswordResets = require('../../../models/password-resets');
const deletePasswordResetEntry = require('./delete-password-reset-entry');
const ResponseError = require('../../../error-handlers/response-error');

describe('Delete Password Reset Entry', function () {

    beforeEach(function() {
        sinon.stub(PasswordResets, 'deleteOne');
    });

    afterEach(function() {
        PasswordResets.deleteOne.restore();
    });

    it('should return a promise', function () {
        expect(deletePasswordResetEntry({})).to.be.a('promise');
    });

    it('should resolve with true if no errors', function () {
        PasswordResets.deleteOne.yields(null);

        return expect(deletePasswordResetEntry({ email: 'hello@hello.com' })).to.eventually.be.true;
    });

    it('should reject with a request error and a status code of 500', function () {
        const errorMessage = 'opps something went wrong';
        PasswordResets.deleteOne.yields(new Error(errorMessage));

        return expect(deletePasswordResetEntry({ email: 'hello@hello.com' })).to.be.eventually.rejectedWith(ResponseError, errorMessage).and.have.property('statusCode', 500);
    });

});

