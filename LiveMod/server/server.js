var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var imageController = require('./controllers/images.js');
var adminController = require('./controllers/admin.js');

mongoose.connect('mongodb://localhost:27017/liveMod');

var app = express();

app.use(bodyParser.urlencoded({
	extended:true
}));

var router = express.Router();

router.route('/images')
	.get(imageController.getImages);

router.route('/image')
	.post(imageController.postImage)
	.get(imageController.getImage);

router.route('/decision')
	.post(imageController.postDecision);

router.route('/admin/event')
	.post(adminController.postEvent)
	.get(adminController.getEvent);

router.route('/admin/getConnections')
	.get(adminController.getConnections);


app.use('/api', router);

app.listen(3000);