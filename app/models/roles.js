"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
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
    },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
});

module.exports = mongoose.model('Role', rolesSchema);
