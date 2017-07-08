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
    req.checkBody('eventdate', 'Date of event is required!').notEmpty();

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
        event.eventdate = req.body.eventdate;
        event.userIds = req.body.userIds;
        event.isNews = req.body.isNews;
        event.participationAllowed = req.body.participationAllowed;
        event.rankingId = req.body.rankingId;
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
        event.eventdate = req.body.eventdate;
        event.userIds = req.body.userIds;
        event.isNews = req.body.isNews;
        event.participationAllowed = req.body.participationAllowed;
        event.rankingId = req.body.rankingId;
        // todo: event.maplocation = req.body.maplocation

		Events.updateEvent(event, function (err, uEvent) {
            resultHandler.handleResult(err, res, uEvent, "Event updated not ok!");
		});
    }
});

// 4.b. Update User registration
router.put('/register',function(req, res){
    // Validation
    req.checkBody('userId', 'User must be delivered!').notEmpty();
    req.checkBody('eventId', 'Event must be delivered').notEmpty();

    var errors = req.validationErrors();
    if(errors)
        res.status(495).send(errors);
    else{
        var eventId = req.body.eventId;
        var userId = req.body.userId;

        // a. Get the userIds of the event
        Events.getRegisteredUsers(eventId, function(err, userIds){
            if (err)
                res.status(495).send(err);
            else if (userIds){
                // b. Check if the acual user is already registered - if not, insert it
                let newUserIds = userIds['userIds'];
                if (newUserIds.indexOf(userId) == -1){
                    newUserIds.push(userId);
                    Events.updateUserIds(eventId, newUserIds, function(err, uEvent){
                        resultHandler.handleResult(err, res, uEvent, "User could not be registered!");
                    })
                }
            } else {
                response.status(400).send(message);
            }
        });
    }
});

// 4.c. Update User un-registration
router.put('/unregister',function(req, res){
    // Validation
    req.checkBody('userId', 'User must be delivered!').notEmpty();
    req.checkBody('eventId', 'Event must be delivered').notEmpty();

    var errors = req.validationErrors();
    if(errors)
        res.status(495).send(errors);
    else{
        var eventId = req.body.eventId;
        var userId = req.body.userId;

        // a. Get the userIds of the event
        Events.getRegisteredUsers(eventId, function(err, userIds){
            if (err)
                res.status(495).send(err);
            else if (userIds){
                // b. Check if the acual user is already registered - if yes, unregister him
                let newUserIds = userIds['userIds'];
                let indexUserId = newUserIds.indexOf(userId);
                if (indexUserId >= 0){
                    newUserIds.splice(indexUserId, 1);
                    Events.updateUserIds(eventId, newUserIds, function(err, uEvent){
                        resultHandler.handleResult(err, res, uEvent, "User could not be un-registered!");
                    })
                }
            } else {
                response.status(400).send(message);
            }
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
    Events.getEvent(query, function(err, event){
        resultHandler.handleResult(err, res, event, "Event not found!");
    });
}

// Export Router
module.exports = router;