var express = require('express');
var router = express.Router();

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
            if (err)
				res.status(495).send(err);
			else if (cClub)
                res.status(200).send(cClub); // Return back the created data
			else
				res.status(400).send("Club not created");
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
			if (err)
				res.status(495).send(err);
			else if (uClub)
                res.status(200).send(uClub); // Return back the updated data
			else
				res.status(400).send("Club updated not ok");
		});
    }
});

// 2. Get Clubs - http://localhost:3000/clubs/clubs
router.get('/clubs', function(req, res){
    Club.getClubs(function(err, clubs){
        if (err)
            res.status(495).send(err);
        else 
            res.status(200).send(clubs); 
    })
});

// 3. Get Club by clubname - http://localhost:3000/clubs/clubname/:nameToSearchForInDb
router.get('/clubname/:name', function(req,res){
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
        if (err)
            res.status(495).send(err);
        else if (!club)
            res.status(495).send("Club not found!");
        else 
            res.status(200).send(club);   
    });
}

// Export Router
module.exports = router;