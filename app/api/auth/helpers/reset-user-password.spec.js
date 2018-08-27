"use strict";

const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

const resetUserPassword = require('./reset-user-password');
const ResponseError = require('../../../error-handlers/response-error');

describe('Reset user password', function () {

    it('should return a promise', function () {
        expect(resetUserPassword([{save: () => {}}, 'newPassword'])).to.be.a('promise');
    });

    it('should resolve with updated user token', function () {
        const newPassword = 'newPassword';
        const user = {
            password: 'oldPassword',
            save: sinon.stub().yields(null, { password: newPassword })
        };

        return expect(resetUserPassword([user, newPassword])).to.eventually.to.be.an('object').and.have.property('password', newPassword);
    });

    it('should reject with a 500 response error', function () {
        const errorMessage = 'opps something went wrong';
        const user = {
            save: sinon.stub().yields(new Error(errorMessage), null)
        }

        return expect(resetUserPassword([user, 'newPassword'])).to.be.eventually.rejectedWith(ResponseError, errorMessage).and.have.property('statusCode', 500);
    });

});

