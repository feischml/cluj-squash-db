let mongoose = require('mongoose');

let rankingDetailSchema = new mongoose.Schema({
    _id:{
        type: String
    },
    position:{
        type: Number,
        required: true
    },
    points:{
        type: Number,
        required: false
    },
    fullname:{
        type: String,
        required: true
    }
});

// Export the Schema
module.exports = rankingDetailSchema;