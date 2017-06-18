var express = require('express');
var router = express.Router();

var Club = require('./clubs.controller');

// 1. Create Club
router.post('/create', function(req, res){

});

// 2. Get Clubs - http://localhost:3000/clubs/clubs
router.get('/clubs', function(req, res){
    Club.getClubs(function(err, clubs){
        if (err){
            res.send(495,err);
            console.log(err);
        } else {
            res.send(clubs);
            // ToDo delete - for testing purposes write result to console
            console.log(clubs);  
        }  
    })
});

// 3. Get Club by clubname - http://localhost:3000/clubs/clubname/:nameToSearchForInDb
router.get('/clubname/:name', function(req,res){
    // Validation: req.params = { name: 'nameToSearchForInDb' };
	req.checkParams('name', 'Club name is required!').notEmpty().isAlphanumeric();

    // Check validation error
    var errors = req.validationErrors();
    if (errors){
        console.log(errors);    
        res.send(495,errors);
    } else {
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
    if (errors){
        console.log(errors);
        res.send(495,errors);
    } else {   
        var query = { _id: req.params.id };
        executeClubDbQuery(query, res);
    }
});

function executeClubDbQuery(query, res){
    Club.getClub(query, function(err, club){
            if (err)
                console.log(err);
            else{
                if (!club)
                    res.send(495,"Club Not Found");
                else {
                    res.send(club);
                    // ToDo delete - for testing purposes write result to console
                    console.log(club);  
                }
            }    
        });
}

module.exports = router;