var adminModel = require('../models/admin');

exports.postEvent = function(req, res){

	var admin = new adminModel();

	admin.eventName = req.body.eName;
	admin.eventID = req.body.eID;
	admin.eventDate = req.body.eDate;
	admin.eventLogo = req.body.eLogo;
	admin.eventImage = req.body.eImage;
	admin.eventDesc = req.body.eDesc;
	admin.isModerated = req.body.moderated;

	admin.save(function(err){
		if(err){
			res.send(err);
		}

		res.json({message: 'Event has been submitted!', data: admin});

	});

}

exports.getEvent = function(req, res){

	adminModel.find({eventId: req.params.event_id}, function(err, eventInfo){

		if(err){
			res.send(err);
		}

		res.json(eventInfo);

	});

}