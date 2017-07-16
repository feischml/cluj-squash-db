let SeasonSchema = require('./season.schema');

// Export the Season Schema
module.exports = SeasonSchema;

// Create Season
module.exports.createSeason = function (season, callback) {
	SeasonSchema.create(season, callback);
};

// Update Season
module.exports.updateSeason = function (season, callback) {
    var cond = { _id: season._id };
	SeasonSchema.findOneAndUpdate(cond, season, { new: true }, callback);
}

// Get Season
module.exports.getSeason = function (options, callback) {
	SeasonSchema.findOne(options, callback);
}

// Get all Seasons
module.exports.getSeasons = function (seasons, callback) {
	SeasonSchema.find(seasons, callback);
}

// Get only the archive Rankings Ids
module.exports.getArchiveRankingIds = function(seasonId, callback){
	var query = SeasonSchema.findById(seasonId, 'rankingArchiveIds', callback);
}

// Delete Season
module.exports.deleteSeasonById = function (seasonId, callback) {
    SeasonSchema.findByIdAndRemove(seasonId, callback);
}

// Update the RankingArchiveIds
module.exports.updateRankingArchiveIds = function(seasonId, rankingArchiveIds, callback){
	SeasonSchema.update({ _id: seasonId }, { rankingArchiveIds: rankingArchiveIds }, callback);
}

// Update the actualRankingId
module.exports.updateRankingId = function(seasonId, actualRankingId, callback){
	SeasonSchema.update({ _id: seasonId }, { actualRankingId: actualRankingId }, callback);
}