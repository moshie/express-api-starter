"use strict";

const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

const confirmAUser = require('./confirm-a-user');
const ResponseError = require('../../../error-handlers/response-error');
const User = require('../../../models/user');

describe('Confirm a user', function () {

    beforeEach(function() {
        sinon.stub(User, 'findOne')
    });

    afterEach(function() {
        User.findOne.restore();
    });

    it('should return a promise', function () {
        expect(confirmAUser('token')).to.be.a('promise');
    });

    it('should resolve with a user if the user is already confirmed', function () {
        var user = {
            _id: 'thisisanID', 
            confirmed: true
        };
        User.findOne.yields(null, user);

        return Promise.all([
            expect(confirmAUser('token')).to.eventually.to.be.an('object'),
            expect(confirmAUser('token')).to.eventually.have.property('_id', user._id),
            expect(confirmAUser('token')).to.eventually.have.property('confirmed', true)
        ]);
    });

    it('should reject with a 500 response error if error occurs', function () {
        var errorMessage = 'opps an error occured';
        User.findOne.yields(new Error(errorMessage));

        return expect(confirmAUser('token')).to.be.eventually.rejectedWith(ResponseError, errorMessage).and.have.property('statusCode', 500);
    });

    it('should reject with a 422 if the user is not found', function () {
        User.findOne.yields(null, null);

        return expect(confirmAUser('token')).to.be.eventually.rejectedWith(ResponseError, 'Invalid Token').and.have.property('statusCode', 422);
    });

    it('should reject with a 422 if the user is not found', function () {
        var errorMessage = 'opps an error occured';
        var user = {
            _id: 'thisisanID', 
            confirmed: false,
            save: sinon.stub().yields(new Error(errorMessage))
        };
        User.findOne.yields(null, user);

        return expect(confirmAUser('token')).to.be.eventually.rejectedWith(ResponseError, errorMessage).and.have.property('statusCode', 500);
    });

    it('should resolve with the user if the user is not confirmed', function () {
        var updatedUser = { confirmed: true }
        var user = {
            confirmed: false,
            save: sinon.stub().yields(null, updatedUser)
        };
        User.findOne.yields(null, user);

        return expect(confirmAUser('token')).to.eventually.be.an('object').and.have.property('confirmed', true);
    });

});

