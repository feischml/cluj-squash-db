let mongoose = require('mongoose');

let rankingDetailSchema = new mongoose.Schema({
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
}, { _id: false });

// Export the Schema
module.exports.schema = rankingDetailSchema;
// Export the Model
module.exports.model = mongoose.model('rankingdetail', rankingDetailSchema, 'rankingdetals');