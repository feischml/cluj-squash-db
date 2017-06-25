let mongoose = require('mongoose');

let coachesSchema = mongoose.Schema({
    achivementdescription:{
        type: String,
    },
    experiencedescription:{
        type: String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('coach', coachesSchema, 'coaches');