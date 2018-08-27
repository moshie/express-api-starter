"use strict";

const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

const updatePasswordReset = require('./update-password-reset');
const ResponseError = require('../../../error-handlers/response-error');
const PasswordResets = require('../../../models/password-resets');

describe('Reset user password', function () {

    it('should return a promise', function () {
        expect(updatePasswordReset('test', 'test')).to.be.a('promise');
    });

    it('should resolve with new password reset', function () {
        const doc = 'doc';
        sinon.stub(PasswordResets.prototype, 'save').yields(null, doc);

        return updatePasswordReset('test@test.com', 'token')
            .then(res => {
                expect(res).to.equal(doc);
                expect(PasswordResets.prototype.save.calledOnce).to.be.true;
                sinon.restore();
            });
    });

    it('should reject with a 500 response error', function () {
        const errorMessage = 'opps something went wrong';
        sinon.stub(PasswordResets.prototype, 'save').yields(new Error(errorMessage));

        return expect(updatePasswordReset('test@test.com', 'token')).to.be.eventually.rejectedWith(ResponseError, errorMessage).and.have.property('statusCode', 500).then(() => sinon.restore())
    });

    it('should save the token to the passed in document', function () {
        const token = 'token';
        const email = 'test@test.com';
        const updatedDocument = { email, token };
        const document = {
            save: sinon.stub().yields(null, updatedDocument)
        }

        return updatePasswordReset(email, token, document)
            .then(res => {
                expect(res).to.deep.equal(updatedDocument);
                expect(document.save.calledOnce).to.be.true;
            });
    })

});

