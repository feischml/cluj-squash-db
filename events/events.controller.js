let EventsSchema = require('./events.schema');

// Export the Events Schema
module.exports = EventsSchema;

// Create Event
module.exports.createEvent = function (event, callback) {
	EventsSchema.create(event, callback);
};

// Update Event
module.exports.updateEvent = function (event, callback) {
    var cond = { _id: event._id };
	EventsSchema.findOneAndUpdate(cond, event, { new: true }, callback);
}

// Get Event
module.exports.getEvent = function (options, callback) {
	EventsSchema.findOne(options, callback);
}

// Get all Events
module.exports.getEvents = function (events, callback) {
	EventsSchema.find(events, callback);
}

// Delete Event
module.exports.deleteEventById = function (eventId, callback) {
    EventsSchema.findByIdAndRemove(eventId, callback);
}