let RolesSchema = require('./roles.schema');

// Export the Roles Schema
module.exports = RolesSchema;

// Create Role
module.exports.createRole = function (role, callback) {
	RolesSchema.create(role, callback);
};

// Update Role
module.exports.updateRole = function (role, callback) {
    var cond = { _id: role._id };
	RolesSchema.findOneAndUpdate(cond, role, { new: true }, callback);
}

// Get Role
module.exports.getRole = function (options, callback) {
	RolesSchema.findOne(options, callback);
}

// Get all roles
module.exports.getRoles = function (roles, callback) {
	RolesSchema.find(roles, callback);
}

// Delete Role
module.exports.deleteRoleById = function (roleId, callback) {
    RolesSchema.findByIdAndRemove(roleId, callback);
}