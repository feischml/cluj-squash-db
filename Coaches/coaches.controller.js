let CoachesSchema = require('./coaches.schema');

// Export the Coaches Schema
module.exports = CoachesSchema;

// Create Coach
module.exports.createCoach = function (coach, callback) {
	CoachesSchema.create(coach, callback);
};

// Update Coach
module.exports.updateCoach = function (coach, callback) {
    var cond = { _id: coach._id };
	CoachesSchema.findOneAndUpdate(cond, coach, { new: true }, callback);
}

// Get Coach
module.exports.getCoach = function (options, callback) {
	CoachesSchema.findOne(options, callback);
}

// Get all Coaches
module.exports.getCoaches = function (coaches, callback) {
	CoachesSchema.find(coaches, callback);
}

// Delete Coach
module.exports.deleteCoachById = function (coach, callback) {
    CoachesSchema.findByIdAndRemove(coach, callback);
}

// Delete Coach By cond
module.exports.deleteCoachByUserId = function (user, callback) {
    var cond = { userId: user._id } ;
    CoachesSchema.findOneAndRemove(cond, callback);
}