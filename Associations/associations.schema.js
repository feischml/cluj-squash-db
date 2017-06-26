let mongoose = require('mongoose');

let associationSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    webpage:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('association', associationSchema, 'associations');