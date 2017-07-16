let mongoose = require('mongoose');

let seasonTypeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    beginner:{
        type: Boolean,
        required: true
    }
}).index({ name: 1, beginner: 1}, { unique: true }); //Setting Keys to be unique

module.exports = mongoose.model('seasontype', seasonTypeSchema, 'seasontypes');