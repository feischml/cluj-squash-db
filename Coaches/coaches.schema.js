let mongoose = require('mongoose');

let coachesSchema = mongoose.Schema({
    achivementdescription:{
        type: String,
        required: true
    },
    experiencedescription:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});