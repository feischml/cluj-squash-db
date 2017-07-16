var express = require('express');
var router = express.Router();
var resultHandler = require('../response.handler');
var Season = require('./season.controller');

// 1. Create a Season 
router.post('/create', function(req, res){
    // Validation
    req.checkBody('name', 'Name is required!').notEmpty();
    req.checkBody('beginDate', 'Begin Date is required!').notEmpty();
    req.checkBody('endDate', 'End Date is required!').notEmpty();
    req.checkBody('seasonTypeId', 'Season Type is required!').notEmpty();

    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {
        var season = new Season();
		season.name = req.body.name;
		season.beginDate  = req.body.beginDate;
        season.endDate = req.body.endDate;
        season.seasonTypeId = req.body.seasonTypeId;
        season.description = req.body.description;
        season.actualRankingId = req.body.actualRankingId;
        season.rankingArchiveIds = req.body.rankingArchiveIds;
        // todo: season.photoId = req.body.photoId

        Season.createSeason(season, function(err, cSeason){
            resultHandler.handleResult(err, res, cSeason, "Season not created!");
        });
    }
});

// 2. Get Seasons - http://localhost:3000/season/seasons
router.get('/seasons', function(req, res){
    Season.getSeasons(function(err, seasons){
        resultHandler.handleResult(err, res, seasons, "Seasons not found!");
    })
});

// 3. Get Season by ID - http://localhost:3000/season/seasonid/:idToSearchForInDb
router.get('/seasonid/:id', function(req, res){
    // Validation: req.params = { id: 'idToSearchForInDb' };
	req.checkParams('id', 'Season id is required!').notEmpty().isHexadecimal();
    // Check validation error
    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {   
        var query = { _id: req.params.id };
        executeSeasonDbQuery(query, res);
    }
});

// 4. Update Season
router.put('/update', function(req, res){
    // Validation
	req.checkBody('_id', 'Season id is required!').notEmpty();

	var errors = req.validationErrors();
	if (errors)
		res.status(495).send(errors);
	else {
        var season = new Season();
        season._id = req.body._id;
        season.name = req.body.name;
		season.beginDate  = req.body.beginDate;
        season.endDate = req.body.endDate;
        season.seasonTypeId = req.body.seasonTypeId;
        season.description = req.body.description;
        season.actualRankingId = req.body.actualRankingId;
        season.rankingArchiveIds = req.body.rankingArchiveIds;
        // todo: season.photoId = req.body.photoId

		Season.updateSeason(season, function (err, uSeason) {
            resultHandler.handleResult(err, res, uSeason, "Season updated not ok!");
		});
    }
});

// 4.b. Update Ranking archives
router.put('/updatearchiverankings',function(req, res){
    // Validation
    req.checkBody('rankingId', 'Ranking must be delivered!').notEmpty();
    req.checkBody('seasonId', 'Season must be delivered').notEmpty();

    var errors = req.validationErrors();
    if(errors)
        res.status(495).send(errors);
    else{
        var rankingId = req.body.rankingId;
        var seasonId = req.body.seasonId;

        // a. Get the rankingIds of the Season
        Season.getArchiveRankingIds(seasonId, function(err, archiveRankingIds){
            if (err)
                res.status(495).send(err);
            else if (archiveRankingIds){
                // b. Check if the acual ranking exists in the archive - if not, insert it
                let newArchiveRankingIds = archiveRankingIds['archiveRankingIds'];
                if (newArchiveRankingIds.indexOf(rankingId) == -1){
                    newArchiveRankingIds.push(rankingId);
                } else {
                    // c. if rankingId des exist, the delete it from the list
                    newArchiveRankingIds.splice(newArchiveRankingIds.indexOf(rankingId),1);
                }
                // d. do the update of the ranking archive
                Season.updateRankingArchiveIds(seasonId, newArchiveRankingIds, function(err, uSeason){
                        resultHandler.handleResult(err, res, uSeason, "Season ranking archives could not be updated");
                })
            } else {
                response.status(400).send(message);
            }
        });
    }
});

// 4.b. Update currentRankingId - current ranking
router.put('/updateRankingId',function(req, res){
    // Validation
    req.checkBody('rankingId', 'Ranking must be delivered!').notEmpty();
    req.checkBody('seasonId', 'Season must be delivered').notEmpty();

    var errors = req.validationErrors();
    if(errors)
        res.status(495).send(errors);
    else{
        var seasonId = req.body.seasonId;
        var rankingId = req.body.rankingId;

        Season.updateRankingId(seasonId, rankingId, function(err, uSeason){
            resultHandler.handleResult(err, res, uSeason, "Ranking could not be updated!");
        });
    }
});

// 5. Delete Season
router.delete('/delete/:id', function(req, res){
    // Validation
    req.checkParams('id', 'Season id is required!').notEmpty().isHexadecimal();

    var errors = req.validationErrors();
    if(errors)
        res.status(495).send(errors);
    else{
         let seasonId = req.params.id;
         Season.deleteSeasonById(seasonId, function(err,dSeason){
            resultHandler.handleResult(err, res, dSeason, "Season could not be deleted!");
        });
    }
});

function executeSeasonDbQuery(query, res){
    Season.getSeason(query, function(err, season){
        resultHandler.handleResult(err, res, season, "Season not found!");
    });
}

// Export Router
module.exports = router;