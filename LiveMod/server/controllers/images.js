var imageModel = require('../models/imageModel');


exports.postDecision = function(req, res){

	res.send({message:"Decision Posted!"});

}

exports.postImage = function(req, res){

	res.json({message:"posted an image"});

}

exports.getImage = function(req, res){

	res.json({message:"got an image"});

}

exports.getImages = function(req, res){

	res.json({message:"got all the images"});

}
