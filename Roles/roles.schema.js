let mongoose = require('mongoose');

let rolesSchema = mongoose.Schema({
    roletype: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    basic: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('role', rolesSchema, 'roles');