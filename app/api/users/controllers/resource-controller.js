"use strict";

const User = require('../../../models/user');
const getUsers = require('../helpers/get-users');
const updateUser = require('../helpers/update-user');
const findUserById = require('../helpers/get-user-by-id');
const { validationResult } = require('express-validator/check');

exports.store = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    var user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name || '',
        email: req.body.email,
        password: req.body.password
    });

    return user.save()
        .then(user => {
            mailer().sendMail({
                from: process.env.WEBSITE_EMAIL,
                to: user.email,
                subject: 'Confirm your Email',
                html: user.confirmation_token // TODO
            })
            return user;
        })
        .then(user => res.status(201).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    confirmed: user.confirmed,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            }
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: '500',
                title: 'There was a problem storing the user',
                detail: err.message
            }]
        }));

}

exports.index = function (req, res) {

    return getUsers()
        .then(users => res.status(200).json({
            data: users.map(user => ({
                type: 'user',
                id: user._id,
                attributes: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    confirmed: user.confirmed,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            }))
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem getting users',
                detail: err.message
            }]
        }));
    
}


exports.show = function (req, res) {

    if (!req.params.user_id) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No user specified',
                detail: 'Define a user id to revoke'
            }]
        });
    }

    return findUserById(req.params.user_id)
        .then(user => res.status(200).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    confirmed: user.confirmed,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            }
        }))
        .catch(err => res.status(err.statusCode || 500).json({
            errors: [{
                status: `${err.statusCode || 500}`,
                title: 'There was a problem getting a user',
                detail: err.message
            }]
        }));

}

exports.update = function (req, res) {

    if (!req.params.user_id) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No user specified',
                detail: 'Define a user id to update'
            }]
        });
    }

    return updateUser(req.params.user_id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
        .then(user => res.status(200).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    confirmed: user.confirmed,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            }
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: '500',
                title: 'There was a problem updating a user',
                detail: err.message
            }]
        }));

}

exports.remove = function (req, res) {

    if (!req.params.user_id) {
        return res.status(400).json({
            errors: [{
                status: '400',
                title: 'No user specified',
                detail: 'Define a user id to update'
            }]
        });
    }

    return User.deleteOne({ _id: req.params.user_id })
        .then(() => res.status(200).json({
            meta: {
                message: 'User removed successfully'
            }
        }))
        .catch(err => res.status(500).json({
            errors: [{
                status: '500',
                title: 'There was a problem removing the user',
                detail: err.message
            }]
        }));

}
