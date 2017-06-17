let ClubsSchema = require('./clubs.schema');

// Export the Clubs Schema
module.exports = ClubsSchema;

// Create Club
module.exports.createClub = function (club, callback) {
	club.save(callback);
}

// Get a Club with given name
module.exports.getClub = function (name, callback) {
	var query = { name: name };
	ClubsSchema.findOne(query, callback);
}

// Get all Clubs
module.exports.getClubs = function (clubs, callback) {
	ClubsSchema.find(clubs, callback);
}
