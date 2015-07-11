var imageModel = require('../models/images');


exports.postDecision = function(req, res){

	imageModel.update({_id:req.params.image_id}, {approved: req.body.decision}, function(err, num, raw){
		if(err){
			res.send(err);
		}

		res.json({message: num + ' updated'});
	});

}

exports.postImage = function(req, res){

	console.log(req);

	var image = new imageModel();

	image.imageTitle = req.body.imageTitle;
	image.imageDesc = req.body.imageDesc;
	image.imagePath = req.body.imagePath;
	image.approved = 0;
	image.uploadedDate = req.body.uploadDate;

	image.save(function(err){
		if(err){
			res.send(err);
		}

		res.json({message: 'Image was saved to the database', data:image});

	});

}

exports.getImage = function(req, res){

	imageModel.find({ _id: req.params.image_id}, function(err, image){
		if(err){
			res.send(err);
		}

		res.json(image);
	});

}

exports.getImages = function(req, res){

	imageModel.find({}, function(err, images){
		if(err){
			res.send(err);
		}

		res.json(images);
	});

}
