"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
    display_name: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Role', rolesSchema);
