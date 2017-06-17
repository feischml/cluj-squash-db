var express = require('express');
var router = express.Router();

var Club = require('./clubs.controller');

// Create routes

// 1. Create Club
router.post('/create', function(req, res){

});

// 2. Get Clubs
router.get('/clubs', function(req, res){
    Club.getClubs(function(err, clubs){
        if (err)
            console.log(err);
        else {
            // ToDo delete - for testing purposes write result to console
            console.log(clubs);  
            res.send(clubs);
        }  
    })
});

module.exports = router;