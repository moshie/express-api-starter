"use strict";

const mongoose = require('mongoose');

const passwordsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('PasswordResets', passwordsSchema);
