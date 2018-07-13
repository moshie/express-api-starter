"use strict";

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;
chai.use(chaiAsPromised);

const authenticate = require('./authenticate');

describe('#authenticate', function () {

    it('should return a promise', function () {
        expect(authenticate()).to.be.a('promise');
    })

    it('should resolve an Unauthorized Error if no email or password is provided');

    it('resolves with a token');

    it('rejects with an Unauthorized Error')

})