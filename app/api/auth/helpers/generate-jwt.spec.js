"use strict";

const { expect } = require('chai');
const sinon = require('sinon');

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
        jwt.sign.yields(null, 'JWTtoken');

        return generateJwt({ _id: 'userID' })
            .then(function (token) {
                expect(token).to.be.a('string');
                expect(token).to.equal('JWTtoken');
            });
    });

    it('should reject with a response error', function () {
        const errorMessage = 'opps something went wrong';
        jwt.sign.yields(new Error(errorMessage), null);

        return generateJwt({ _id: 'userID' })
            .catch(err => {
                expect(err).to.be.an.instanceof(ResponseError);
                expect(err).to.have.property('message', errorMessage);
                expect(err).to.have.property('statusCode', 500);
            });
    });


});

