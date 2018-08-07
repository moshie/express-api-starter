"use strict";

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

const authenticate = require('./authenticate');
const ResponseError = require('../../../error-handlers/response-error');

describe('#authenticate', function () {

    it('should return a promise', function () {
        var auth = authenticate();
        auth.should.be.a('promise');
    })

    it('should resolve a 404 Error if no email or password is provided', function () {
        return authenticate().should.be.rejectedWith(ResponseError);
    });

    it('resolves with a token');

    it('rejects with an Unauthorized Error')

})