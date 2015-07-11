var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
	eventName: String,
	eventID: String,
	eventDate: Date,
	eventLogo: String,
	eventImage: String,
	eventDesc: String,
	isModerated: Boolean
});

module.exports = mongoose.model('Admin', adminSchema);