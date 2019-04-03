'use strict'

const chai = require('chai')
const expect = chai.expect

const mailer = require('./mailer-service')

describe('Mailer Service', function () {

    it('gets the mailing transporter', function () {

        var service = mailer();

        expect(service).to.respondTo('sendMail')

    })

})
