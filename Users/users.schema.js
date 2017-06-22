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
    }
    
    // ToDo photoId -> "join with Photos"
    // ToDo roleId -> "join with Roles" 1-n relationship
});

module.exports = mongoose.model('user', userSchema, 'users');