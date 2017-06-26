let AssociationsSchema = require('./associations.schema');

// Export the Associations Schema
module.exports = AssociationsSchema;

// Create Association
module.exports.createAssociation = function (assoctiation, callback) {
	AssociationsSchema.create(assoctiation, callback);
};

// Update Association
module.exports.updateAssociation = function (association, callback) {
    var cond = { _id: association._id };
	AssociationsSchema.findOneAndUpdate(cond, association, { new: true }, callback);
}

// Get Assotiation
module.exports.getAssociation = function (options, callback) {
	AssociationsSchema.findOne(options, callback);
}

// Get all Assotiations
module.exports.getAssociations = function (associations, callback) {
	AssociationsSchema.find(associations, callback);
}

// Delete Association
module.exports.deleteAssociationById = function (associationId, callback) {
    AssociationsSchema.findByIdAndRemove(associationId, callback);
}