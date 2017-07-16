let SeasonTypeSchema = require('./seasontype.schema');

// Export the SaesonType Schema
module.exports = SeasonTypeSchema;

// Create SeasonType
module.exports.createSeasonType = function (seasontype, callback) {
	SeasonTypeSchema.create(seasontype, callback);
};

// Update SeasonType
module.exports.updateSeasonType = function (seasontype, callback) {
    var cond = { _id: seasontype._id };
	SeasonTypeSchema.findOneAndUpdate(cond, seasontype, { new: true }, callback);
}

// Get SeasonType
module.exports.getSeasonType = function (options, callback) {
	SeasonTypeSchema.findOne(options, callback);
}

// Get all SeasonTypes
module.exports.getSeasonTypes = function (seasontypes, callback) {
	SeasonTypeSchema.find(seasontypes, callback);
}

// Delete SeasonType
module.exports.deleteSeasonTypeById = function (seasontypeId, callback) {
    SeasonTypeSchema.findByIdAndRemove(seasontypeId, callback);
}