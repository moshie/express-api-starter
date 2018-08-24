"use strict";

const { expect } = require('chai');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');

const guestMiddleware = require('./guest');

describe('Guest Middleware', function () {

    it('should prevent authenticated users if the authorization header is set', function () {

        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/',
            headers: { authorization: '' }
        });
        const response = httpMocks.createResponse();

        guestMiddleware(request, response);

        var body = JSON.parse(response._getData());

        expect(body).to.have.deep.property('meta', {
            message: 'You are not authorised to view this page'
        });

        expect(response.statusCode).to.equal(403);
        expect(response._isEndCalled()).to.be.ok;
        expect(response._isJSON()).to.be.ok;
        expect(response._isUTF8()).to.be.ok;

    });


    it('should call next if user is not authenticated', function () {

        const request = httpMocks.createRequest();
        const response = httpMocks.createResponse();

        var next = sinon.spy();

        guestMiddleware(request, response, next);

        expect(next.calledOnce).to.be.ok;

    });

});