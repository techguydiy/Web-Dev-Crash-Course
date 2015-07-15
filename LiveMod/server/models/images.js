var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	imageTitle: String,
	imageDesc: String,
	imagePath: String,
	imageExt: String,
	approved: Boolean,
	uploadedDate: Date
});

module.exports = mongoose.model('Image', imageSchema);