"use strict";

const User = require('../../../models/user');
const getUsers = require('../helpers/get-users');
const updateUser = require('../helpers/update-user');
const findUserById = require('../helpers/get-user-by-id');
const { validationResult } = require('express-validator/check');

exports.store = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    var user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name || '',
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then(user => mailer().sendMail({
            from: process.env.WEBSITE_EMAIL,
            to: user.email,
            subject: 'Confirm your Email',
            html: user.confirmation_token
        }))
        .then(() => res.status(201).json({
            data: { message: 'User Created' }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));

}

exports.index = function (req, res) {

    getUsers()
        .then(users => res.status(200).json({
            data: users.map(user => ({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name || '',
                email: user.email
            }))
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));
    
}


exports.show = function (req, res) {

    if (!req.params.user_id) {
        return res.status(400).json({
            data: { message: 'No User ID provided' }
        });
    }

    findUserById(req.params.user_id)
        .then(user => res.status(200).json({
            data: {
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name || '',
                    email: user.email
                }
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            data: { message: err.message }
        }));

}

exports.update = function (req, res) {

    if (!req.params.user_id) {
        return res.status(400).json({
            data: { message: 'No User ID provided' }
        });
    }

    updateUser(req.params.user_id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
        .then(user => res.status(200).json({
            data: {
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }
            }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));

}

exports.remove = function (req, res) {

    if (!req.params.user_id) {
        return res.status(400).json({
            data: { message: 'No User ID provided' }
        });
    }

    User.deleteOne({ _id: req.params.user_id })
        .then(() => res.status(200).json({
            data: { message: 'User removed successfully' }
        }))
        .catch(err => res.status(500).json({
            data: { message: err.message }
        }));

}
