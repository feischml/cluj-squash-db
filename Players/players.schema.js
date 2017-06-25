let mongoose = require('mongoose');

let playersSchema = mongoose.Schema({
    bestlocalranking:{
        type: Number
    },
    bestnationalranking:{
        type: Number
    },
    bestnationalrankingdate:{
        type: Date
    },
    achieventdescription:{
        type: String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('player', playersSchema, 'players');