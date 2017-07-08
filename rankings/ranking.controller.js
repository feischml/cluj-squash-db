let RankingsSchema = require('./ranking.schema');

// Export the Rankings Schema
module.exports = RankingsSchema;

// Create Ranking
module.exports.createRanking = function (ranking, callback) {
	RankingsSchema.create(ranking, callback);
};

// Update Ranking
module.exports.updateRanking = function (ranking, callback) {
    var cond = { _id: ranking._id };
	RankingsSchema.findOneAndUpdate(cond, ranking, { new: true }, callback);
}

// Get Ranking
module.exports.getRanking = function (options, callback) {
	RankingsSchema.findOne(options, callback);
}

// Get all Rankings
module.exports.getRankings = function (rankings, callback) {
	RankingsSchema.find(rankings, callback);
}

// Delete Ranking
module.exports.deleteRankingById = function (rankingId, callback) {
    RankingsSchema.findByIdAndRemove(rankingId, callback);
}