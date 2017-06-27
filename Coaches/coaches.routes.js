var express = require('express');
var router = express.Router();
var resultHandler = require('../response.handler');
var Coach = require('./coaches.controller');
var User = require('../Users/users.controller');

// 1. Create a Coach (when sign-up is done and Coach role is selected) -> see User / register

// 2. Get Coaches - http://localhost:3000/coaches/coaches
router.get('/coaches', function(req, res){
    Coach.getCoaches(function(err, coaches){
        resultHandler.handleResult(err,res,coaches,"Coaches not found!");
    })
});

// 3. Get Coach by ID - http://localhost:3000/coaches/coachid/:idToSearchForInDb
router.get('/coachid/:id', function(req, res){
    // Validation: req.params = { id: 'idToSearchForInDb' };
	req.checkParams('id', 'Coach id is required!').notEmpty().isHexadecimal();

    // Check validation error
    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {  
        var query = { _id: req.params.id };
        executeCoachDbQuery(query, res);
    }
});

// 4. Update Coach
router.put('/update', function(req, res){
    // Validation
	req.checkBody('_id', 'Coach id is required!').notEmpty();

	var errors = req.validationErrors();
	if (errors)
		res.status(495).send(errors);
	else {
        var coach = new Coach();
        coach._id = req.body._id;
		coach.achivementdescription = req.body.achivementdescription;
        coach.experiencedescription = req.body.experiencedescription;
        coach.userId = req.body.userId;

		Coach.updateCoach(coach, function (err, uCoach) {
            resultHandler.handleResult(err,res,uCoach,"Coach update not ok!");
		});
    }
});

// 5. Delete Coach
// -> see User / delete; If a User is deleted, if the User has Coaches roles, it should be deleted
// -> from Coaches table

function executeCoachDbQuery(query, res){
    Coach.getCoach(query, function(err, coach){
            if (err)
                res.status(495).send(err);
            else if (!coach)
                    res.status(495).send("Coach not found!");
                else {
                    // Get also the User 
                    var query = { _id: coach.userId };
                    User.getUser(query, function(err, user){
                        if (err)
                            res.status(495).send(err);
                        else if (!user)
                                res.status(495).send("Coach/User not found!");
                            else {
                                var coachUser = {};
                                coachUser.coach = coach;
                                coachUser.user = user;
                                res.status(200).send(coachUser);
                            }    
                    });
                }  
        });
}

// Export Router
module.exports = router;