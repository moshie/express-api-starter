"use strict";

const { expect } = require('chai');
const sinon = require('sinon');

const generateToken = require('./generate-token');
const ResponseError = require('../../../error-handlers/response-error');
const crypto = require('crypto');

describe('Generate JWT', function () {

    beforeEach(function() {
        sinon.stub(crypto, 'randomBytes')
    });

    afterEach(function() {
        crypto.randomBytes.restore();
    });

    it('should return a promise', function () {
        expect(generateToken()).to.be.a('promise');
    });

    it('should resolve with a token', function () {
        var bufferedToken = new Buffer('hello');
        crypto.randomBytes.yields(null, bufferedToken);

        return generateToken()
            .then(function (token) {
                expect(token).to.be.a('string');
                expect(token).to.equal(bufferedToken.toString('hex'));
            });
    });

    it('should reject with a response error', function () {
        var errorMessage = 'opps an error occured';
        crypto.randomBytes.yields(new Error(errorMessage));

        return generateToken()
            .catch(function (err) {
                expect(err).to.be.an.instanceof(ResponseError);
                expect(err).to.have.property('message', errorMessage);
                expect(err).to.have.property('statusCode', 500);
            });
    });


});

