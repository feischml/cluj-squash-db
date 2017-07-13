var express = require('express');
var router = express.Router();
var resultHandler = require('../response.handler');
var Rankings = require('./ranking.controller');

// 1. Create a Ranking
router.post('/create', function(req, res){
    var ranking = new Rankings();
    ranking.details = req.body.details;

    console.log(ranking);

    Rankings.createRanking(ranking, function(err, cRanking){
        resultHandler.handleResult(err, res, cRanking, "Ranking not created!");
    });
});

// 2. Get Ranking by ID - http://localhost:3000/rankings/rankingid/:idToSearchForInDb
router.get('/rankingid/:id', function(req, res){
    // Validation: req.params = { id: 'idToSearchForInDb' };
	req.checkParams('id', 'Ranking id is required!').notEmpty().isHexadecimal();
    // Check validation error
    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {   
        var query = { _id: req.params.id };
        executeRankingDbQuery(query, res);
    }
});

// 3. Update Ranking
router.put('/update', function(req, res){
    // Validation
	req.checkBody('_id', 'Ranking id is required!').notEmpty();

	var errors = req.validationErrors();
	if (errors)
		res.status(495).send(errors);
	else {
        var ranking = new Rankings();
        ranking._id = req.body._id;
		ranking.details = req.body.details;

		Rankings.updateRanking(ranking, function (err, uRanking) {
            resultHandler.handleResult(err, res, uRanking, "Ranking updated not ok!");
		});
    }
});

function executeRankingDbQuery(query, res){
    Rankings.getRanking(query, function(err, ranking){
        resultHandler.handleResult(err, res, ranking, "Ranking not found!");
    });
}

// Export Router
module.exports = router;