"use strict";

const mongoose = require('mongoose');

const permissionsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    }
});

module.exports = mongoose.model('Permission', permissionsSchema);
