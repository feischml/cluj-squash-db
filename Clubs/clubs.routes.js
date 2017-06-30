var express = require('express');
var router = express.Router();
var resultHandler = require('../response.handler');
var Club = require('./clubs.controller');

// 1. Create Club
router.post('/create', function(req, res){
    // Validation
    req.checkBody('webpage', 'Webpage is required!').notEmpty();
    req.checkBody('clubname', 'Clubname is required!').notEmpty();
    req.checkBody('phone', 'Phone is required!').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {
        var club = new Club();
        club.clubname       = req.body.clubname;
		club.description    = req.body.description;
		club.phone          = req.body.phone;
		club.webpage        = req.body.webpage;
        //ToDo: club.location       = req.body.location;

        Club.createClub(club, function(err, cClub){
            resultHandler.handleResult(err, res, cClub, "Club not created!");
        });
    }
});

// 1.b. Update Club
router.put('/update', function(req, res){
    // Validation
	req.checkBody('_id', 'Club id is required!').notEmpty();

	var errors = req.validationErrors();
	if (errors)
		res.status(495).send(errors);
	else {
        var club = new Club();
		club._id            = req.body._id;
		club.clubname       = req.body.clubname;
		club.description    = req.body.description;
		club.phone          = req.body.phone;
		club.webpage        = req.body.webpage;
        club.location       = req.body.location;

		Club.updateClub(club, function (err, uClub) {
            resultHandler.handleResult(err, res, uClub, "Club update not ok!");
		});
    }
});

// 2. Get Clubs - http://localhost:3000/clubs/clubs
router.get('/clubs', function(req, res){
    Club.getClubs(function(err, clubs){
        resultHandler.handleResult(err, res, clubs, "Clubs not found!");
    })
});

// 3. Get Club by clubname - http://localhost:3000/clubs/clubname/:nameToSearchForInDb
router.get('/clubname/:name', function(req, res){
    // Validation: req.params = { name: 'nameToSearchForInDb' };
	req.checkParams('name', 'Club name is required!').notEmpty().isAlphanumeric();

    // Check validation error
    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);   
    else {
        var query = { clubname: req.params.name };    
        executeClubDbQuery(query, res);
    }
});

// 4. Get Club by id - http://localhost:3000/clubs/clubid/:idToSearchForInDb
router.get('/clubid/:id', function(req, res){
    // Validation: req.params = { id: 'idToSearchForInDb' };
	req.checkParams('id', 'Club id is required!').notEmpty().isHexadecimal();

    // Check validation error
    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {
        var query = { _id: req.params.id };
        executeClubDbQuery(query, res);
    }
});

function executeClubDbQuery(query, res){
    Club.getClub(query, function(err, club){
        resultHandler.handleResult(err, res, club, "Club not found!");
    });
}

// Export Router
module.exports = router;