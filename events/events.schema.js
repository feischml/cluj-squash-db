let mongoose = require('mongoose');

// Needed for mongoose.Schema.Types.Point
let geoJson = require('mongoose-geojson-schema'); 

let eventSchema = mongoose.Schema({
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
    },
    eventdate:{
        type: Date,
        required: true
    },
    registeruntildate:{
        type: Date,
        required: false
    },
    locationdescription:{
        type: String,
        required: false
    },
    locationwebpage:{
        type: String,
        required: false
    },
    maplocation:{
        type: mongoose.Schema.Types.Point,
        required: false
    },
    userIds:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }],
    isNews: {
        type: Boolean,
        required: false
    },
    participationAllowed: {
        type: Boolean,
        required: false
    },
    rankingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ranking'
    }
});

module.exports = mongoose.model('event', eventSchema, 'events');