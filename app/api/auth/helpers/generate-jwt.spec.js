"use strict";

const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

const generateJwt = require('./generate-jwt');
const ResponseError = require('../../../error-handlers/response-error');
const jwt = require('jsonwebtoken');

describe('Generate JWT', function () {

    beforeEach(function() {
        sinon.stub(jwt, 'sign');
    });

    afterEach(function() {
        jwt.sign.restore();
    });

    it('should return a promise', function () {
        expect(generateJwt({})).to.be.a('promise');
    });

    it('should resolve with a token', function () {
        const token = 'JWTtoken';
        jwt.sign.yields(null, token);

        return expect(generateJwt({ _id: 'userID' })).to.eventually.to.be.a('string').and.to.equal(token);
    });

    it('should reject with a 500 response error', function () {
        const errorMessage = 'opps something went wrong';
        jwt.sign.yields(new Error(errorMessage), null);

        return expect(generateJwt({_id: ''})).to.be.eventually.rejectedWith(ResponseError, errorMessage).and.have.property('statusCode', 500);
    });

});

