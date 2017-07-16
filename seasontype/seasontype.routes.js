var express = require('express');
var router = express.Router();
var resultHandler = require('../response.handler');
var SeasonType = require('./seasontype.controller.js');

// 1. Create a SeasonType 
router.post('/create', function(req, res){
    // Validation
    req.checkBody('name', 'Name is required!').notEmpty();
    req.checkBody('beginner', 'Beginner Flag(true/false) is required!').notEmpty();

    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {
        var seasontype = new SeasonType();
		seasontype.name = req.body.name;
		seasontype.beginner = req.body.beginner;

        SeasonType.createSeasonType(seasontype, function(err, cSeasontype){
            resultHandler.handleResult(err, res, cSeasontype, "Season Type not created");
        });
    }
});

// 2. Get SeasonTypes - http://localhost:3000/seasontype/seasontypes
router.get('/seasontypes', function(req, res){
    SeasonType.getSeasonTypes(function(err, seasontypes){
        resultHandler.handleResult(err, res, seasontypes, "Season Types not found");
    })
});

// 3. Get SeasonTypes by ID - http://localhost:3000/seasontype/seasontypeid/:idToSearchForInDb
router.get('/seasontypeid/:id', function(req, res){
    // Validation: req.params = { id: 'idToSearchForInDb' };
	req.checkParams('id', 'Season Type id is required!').notEmpty().isHexadecimal();
    // Check validation error
    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {   
        var query = { _id: req.params.id };
        executeSeasonTypesDbQuery(query, res);
    }
});

// 4. Update SeasonType
router.put('/update', function(req, res){
    // Validation
	req.checkBody('_id', 'Season Type id is required!').notEmpty();

	var errors = req.validationErrors();
	if (errors)
		res.status(495).send(errors);
	else {
        var seasontype = new SeasonType();
        seasontype._id = req.body._id;
        seasontype.beginner = req.body.beginner;
        seasontype.name = req.body.name;

		SeasonType.updateSeasonType(seasontype, function (err, uSeasontype) {
            resultHandler.handleResult(err, res, uSeasontype, "Season Type updated not ok");
		});
    }
});

// 5. Delete SeasonType
router.delete('/delete/:id', function(req, res){
    // Validation
    req.checkParams('id', 'Season Type id is required!').notEmpty().isHexadecimal();

    var errors = req.validationErrors();
    if(errors)
        res.status(495).send(errors);
    else{
         let seasonTypeId = req.params.id;
         SeasonType.deleteSeasonTypeById(seasonTypeId, function(err, dSeasontype){
            resultHandler.handleResult(err, res, dSeasontype, "Season Type could not be deleted!");
        });
    }
});

function executeSeasonTypesDbQuery(query, res){
    SeasonType.getSeasonType(query, function(err, seasontype){
        resultHandler.handleResult(err, res, seasontype, "Season Type not found!");
    });
}

// Export Router
module.exports = router;