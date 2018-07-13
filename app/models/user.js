"use strict";

const mongoose = require('mongoose');
const { hash } = require('bcrypt');
const generateToken = require('../api/auth/helpers/generate-token');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        lowercase: true,
        trim: true
    },
    last_name: {
        type: String,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    confirmation_token: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.virtual('full_name')
    .get(function () {
        return `${this.first_name} ${this.last_name}`;
    });

userSchema.pre('save', function (next) {

    if (this.isNew) {
        return Promise.all([
            hash(this.password, 10),
            generateToken()
        ])
        .then(encryptedValues => {
            this.confirmation_token = encryptedValues[1]
            this.password = encryptedValues[0];
        })
    }

    next();
});

module.exports = mongoose.model('User', userSchema);
