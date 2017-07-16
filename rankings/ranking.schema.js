let mongoose = require('mongoose');
let rankingDetailsSchema = require('./rankingdetail.schema').schema;

let rankingSchema = new mongoose.Schema({
    details: [ rankingDetailsSchema ]
    //,year: {  ++++++++++++ ToDo
    //    type: Number,
    //    required: false
    //},
    //month: {
    //    type: Number,
    //    required: false
    //},
    //photoId: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'photo'
    //}
});

module.exports = mongoose.model('ranking', rankingSchema, 'rankings');