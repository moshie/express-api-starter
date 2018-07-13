"use strict";

const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');

function mailer () {
    return nodemailer.createTransport(mailgun({
        auth: {
            api_key: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN
        }
    }));
}

module.exports = mailer;
