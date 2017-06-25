let PlayersSchema = require('./players.schema');

// Export the Players Schema
module.exports = PlayersSchema;

// Create Player
module.exports.createPlayer = function (player, callback) {
	PlayersSchema.create(player, callback);
};

// Update Player
module.exports.updatePlayer = function (player, callback) {
    var cond = { _id: player._id };
	PlayersSchema.findOneAndUpdate(cond, player, { new: true }, callback);
}

// Get Player
module.exports.getPlayer = function (options, callback) {
	PlayersSchema.findOne(options, callback);
}

// Get all Players
module.exports.getPlayers = function (players, callback) {
	PlayersSchema.find(players, callback);
}

// Delete Player By ID
module.exports.deletePlayerById = function (player, callback) {
    PlayersSchema.findByIdAndRemove(player, callback);
}

// Delete Player By cond
module.exports.deletePlayerByUserId = function (user, callback) {
    var cond = { userId: user._id } ;
    PlayersSchema.findOneAndRemove(cond, callback);
}