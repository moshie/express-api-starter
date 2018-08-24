"use strict";

const { expect } = require('chai');
const sinon = require('sinon');

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

        return deletePasswordResetEntry({ email: 'hello@hello.com' })
            .then(response => {
                expect(response).to.be.true;
            });
    });

    it('should reject with a request error and a status code of 500', function () {
        const errorMessage = 'opps something went wrong';
        PasswordResets.deleteOne.yields(new Error(errorMessage));

        return deletePasswordResetEntry({ email: 'hello@hello.com' })
            .catch(err => {
                expect(err).to.be.an.instanceof(ResponseError);
                expect(err).to.have.property('message', errorMessage);
                expect(err).to.have.property('statusCode', 500);
            });
    });

});

