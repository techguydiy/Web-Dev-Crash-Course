var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');

var imageController = require('./controllers/images.js');
var adminController = require('./controllers/admin.js');

mongoose.connect('mongodb://localhost:27017/liveMod');

var app = express();
app.use(cors());
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var totalUsers = 0;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
	extended:true
}));

app.get('/', function(req, res, next){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

	console.log('a user has connected - connect users = ' + totalUsers);
	//totalUsers = totalUser + 1;

	socket.on('disconnect', function(){
		totalUsers--;
		io.sockets.emit('updateUsers', 'remove');
		console.log("user disonnected - connected users = " + totalUsers);
		
	});

	socket.on('activeAdmin', function(){
		totalUsers++;
		io.sockets.emit('currentUsers', totalUsers);
	});

	socket.on('addedUser', function(){
		totalUsers++;
		io.sockets.emit('updateUsers', 'add');
	});
});

app.use(multer({ dest: './public/uploads/',
	rename: function(fieldname, filename){
		return filename+Date.now();
	},
	onFileUploadStart: function(file) {
		console.log(file.originalname + ' is starting...');
	},
	onFileUploadComplete: function(file){
		console.log(file.fieldname + ' uploaded to ' + file.path)
		done=true;
	}
}));



var router = express.Router();

router.route('/images')
	.get(imageController.getImages);

router.route('/image/:image_id')
	.get(imageController.getImage)
	.post(imageController.removeImage);

router.route('/image')
	.post(imageController.postImage);

router.route('/decision/:image_id')
	.post(imageController.postDecision);

router.route('/admin/event/:event_id')
	.get(adminController.getEvent);

router.route('/admin/event')
	.post(adminController.postEvent);


app.use('/api', router);

server.listen(3000);