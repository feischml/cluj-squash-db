let mongoose = require('mongoose');

let seasonSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    beginDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    seasonTypeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seasontype',
        required: true
    },
    description:{
        type: String,
        required: false
    },
    actualRankingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ranking'
    },
    //photoId: { +++++ToDo
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'photo'
    //}
    rankingArchiveIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ranking',
        required: false
    }]
}).index({ name: 1, beginDate: 1, endDate: 1, seasonTypeId: 1 }, { unique: true }); //Setting Keys to be unique

module.exports = mongoose.model('season', seasonSchema, 'seasons');