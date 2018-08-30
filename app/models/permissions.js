'use strict'

const mongoose = require('mongoose')

const permissionsSchema = new mongoose.Schema({
    display_name: {
        type: String,
        trim: true,
        required: true
    },
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
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Permission', permissionsSchema)
