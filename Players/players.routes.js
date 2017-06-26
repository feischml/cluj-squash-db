var express = require('express');
var router = express.Router();

var Player = require('./players.controller');
var User = require('../Users/users.controller');

// 1. Create a Player (when sign-up is done and Player role is selected)
// -> see User / register

// 2. Get Players - http://localhost:3000/players/players
router.get('/players', function(req, res){
    Player.getPlayers(function(err, players){
        if (err){
            res.status(495).send(err);
        } else {
            res.status(200).send(players); 
        }  
    })
});

// 3. Get Player by ID - http://localhost:3000/players/playerid/:idToSearchForInDb
router.get('/playerid/:id', function(req, res){
    // Validation: req.params = { id: 'idToSearchForInDb' };
	req.checkParams('id', 'Player id is required!').notEmpty().isHexadecimal();

    // Check validation error
    var errors = req.validationErrors();
    if (errors){
        res.status(495).send(errors);
    } else {   
        var query = { _id: req.params.id };
        executePlayerDbQuery(query, res);
    }
});


// 4. Update Player
router.put('/update', function(req, res){
    // Validation
	req.checkBody('_id', 'Player id is required!').notEmpty();

	var errors = req.validationErrors();
	if (errors){
		res.status(495).send(errors);
    }
	else {

        var player = new Player();
        player._id = req.body._id;
		player.bestlocalranking = req.body.bestlocalranking;
        player.bestnationalranking = req.body.bestnationalranking;
        player.bestnationalrankingdate = req.body.bestnationalrankingdate;
        player.achieventdescription = req.body.achieventdescription;
        player.userId = req.body.userId;

		Player.updatePlayer(player, function (err, uPlayer) {
			if (err)
				res.status(495).send(err);
			else if (uPlayer)
                res.status(200).send(uPlayer); // Return back the updated data
			else
				res.status(401).send("Player updated not ok");
		});
    }
});

// 5. Delete Player
// -> see User / delete; If a User is deleted, if the User has Player roles, it should be deleted
// -> from Players table

function executePlayerDbQuery(query, res){
    Player.getPlayer(query, function(err, player){
            if (err)
                res.status(495).send(err);
            else{
                if (!player)
                    res.status(495).send("Player not found!");
                else {
                    // Get also the User 
                    var query = { _id: player.userId };
                    User.getUser(query, function(err, user){
                        if (err)
                            res.status(495).send(err);
                        else{
                            if (!user)
                                res.status(495).send("Player/User not found!");
                            else {
                                var playerUser = {};
                                playerUser.player = player;
                                playerUser.user = user;
                                res.status(200).send(playerUser);
                            }
                        }    
                    });
                }
            }    
        });
}

// Export Router
module.exports = router;
