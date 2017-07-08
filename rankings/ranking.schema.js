let mongoose = require('mongoose');
let rankingDetailsSchema = require('./rankingdetail.schema');

let rankingSchema = new mongoose.Schema({
    details: [ rankingDetailsSchema ]
});

module.exports = mongoose.model('ranking', rankingSchema, 'rankings');