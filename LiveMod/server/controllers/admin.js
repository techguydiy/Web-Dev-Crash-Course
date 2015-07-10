var adminModel = require('../models/admin');

exports.postEvent = function(req, res){

	res.send({message:"Added Event"});

}

exports.getEvent = function(req, res){

	res.send({message:"got event details."});

}

exports.getConnections = function(req, res){

	res.send({message:"got all your connections"});

}