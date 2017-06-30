var express = require('express');
var router = express.Router();
var resultHandler = require('../response.handler');
var Events = require('./events.controller');

// 1. Create an Event 
router.post('/create', function(req, res){
    // Validation
    req.checkBody('name', 'Type is required!').notEmpty();
    req.checkBody('webpage', 'Name is required!').notEmpty();
    req.checkBody('description', 'Description is required!').notEmpty();
    req.checkBody('date', 'Date of event is required!').notEmpty();

    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {
        var event = new Events();
        event.webpage      = req.body.webpage;
		event.name         = req.body.name;
		event.description  = req.body.description;
        event.registeruntildate = req.body.registeruntildate;
        event.locationdescription = req.body.locationdescription;
        event.locationwebpage = req.body.locationwebpage;
        // todo: event.maplocation = req.body.maplocation

        Events.createEvent(event, function(err, cEvent){
            resultHandler.handleResult(err, res, cEvent, "Event not created!");
        });
    }
});

// 2. Get Events - http://localhost:3000/events/events
router.get('/events', function(req, res){
    Events.getEvents(function(err, events){
        resultHandler.handleResult(err, res, events, "Events not found!");
    })
});

// 3. Get Event by ID - http://localhost:3000/events/eventid/:idToSearchForInDb
router.get('/eventid/:id', function(req, res){
    // Validation: req.params = { id: 'idToSearchForInDb' };
	req.checkParams('id', 'Event id is required!').notEmpty().isHexadecimal();
    // Check validation error
    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {   
        var query = { _id: req.params.id };
        executeEventDbQuery(query, res);
    }
});

// 4. Update Event
router.put('/update', function(req, res){
    // Validation
	req.checkBody('_id', 'Event id is required!').notEmpty();

	var errors = req.validationErrors();
	if (errors)
		res.status(495).send(errors);
	else {
        var event = new Events();
        event._id = req.body._id;
		event.webpage = req.body.webpage;
        event.description = req.body.description;
        event.name = req.body.name;
        event.registeruntildate = req.body.registeruntildate;
        event.locationdescription = req.body.locationdescription;
        event.locationwebpage = req.body.locationwebpage;
        // todo: event.maplocation = req.body.maplocation

		Events.updateEvent(event, function (err, uEvent) {
            resultHandler.handleResult(err, res, uEvent, "Event updated not ok!");
		});
    }
});

// 5. Delete Event
router.delete('/delete/:id', function(req, res){
    // Validation
    req.checkParams('id', 'Event id is required!').notEmpty().isHexadecimal();

    var errors = req.validationErrors();
    if(errors)
        res.status(495).send(errors);
    else{
         let eventId = req.params.id;
         Events.deleteEventById(eventId, function(err,dEvent){
            resultHandler.handleResult(err, res, dEvent, "Event could not be deleted!");
        });
    }
});

function executeEventDbQuery(query, res){
    Events.getAssociation(query, function(err, event){
        resultHandler.handleResult(err, res, event, "Event not found!");
    });
}

// Export Router
module.exports = router;