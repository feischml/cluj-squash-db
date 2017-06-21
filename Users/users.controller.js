let UsersSchema = require('./users.schema');
let bcrypt = require('bcryptjs');

// Export the Users Schema
module.exports = UsersSchema;

// Create User
module.exports.createUser = function (user, callback) {
    bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(user.password, salt, function (err, hash) {
			user.password = hash;
			UsersSchema.create(user, callback);
		});
	});
}

// Update User
module.exports.updateUser = function (user, callback) {
    var cond = { _id: user._id };
	UsersSchema.findOneAndUpdate(cond, user, { new: true }, callback);
}

// Get a User with given options (username/password)
module.exports.getUser = function (options, callback) {
	UsersSchema.findOne(options, callback);
}
