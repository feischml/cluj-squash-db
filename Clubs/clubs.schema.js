let mongoose = require('mongoose');

// Needed for mongoose.Schema.Types.Point
let geoJson = require('mongoose-geojson-schema'); 

let clubSchema = mongoose.Schema({
    clubname:{
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
    },
    phone:{
        type: String,
        required: true
    },
    location:{
        type: mongoose.Schema.Types.Point,
        required: false
    }
});

module.exports = mongoose.model('club', clubSchema, 'clubs');