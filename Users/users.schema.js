let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    birthdate:{
        type: Date,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: false
    },
    roleIds:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'role'
        }]
    // ToDo photoId -> "join with Photos"
});

module.exports = mongoose.model('user', userSchema, 'users');