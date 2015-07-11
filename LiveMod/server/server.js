var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var imageController = require('./controllers/images.js');
var adminController = require('./controllers/admin.js');

mongoose.connect('mongodb://localhost:27017/liveMod');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var totalUsers = 0;
app.use(bodyParser.urlencoded({
	extended:true
}));

app.get('/', function(req, res, next){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	totalUsers++;
	console.log('a user has connected - connect users = ' + totalUsers);
	//totalUsers = totalUser + 1;

	socket.on('disconnect', function(){
		totalUsers--;
		console.log("user disonnected - connected users = " + totalUsers);
		
	});
});



var router = express.Router();

router.route('/images')
	.get(imageController.getImages);

router.route('/image/:image_id')
	.get(imageController.getImage);

router.route('/image')
	.post(imageController.postImage);

router.route('/decision/:image_id')
	.post(imageController.postDecision);

router.route('/admin/event')
	.post(adminController.postEvent)
	.get(adminController.getEvent);

router.route('/admin/getConnections')
	.get(adminController.getConnections);


app.use('/api', router);

server.listen(3000);