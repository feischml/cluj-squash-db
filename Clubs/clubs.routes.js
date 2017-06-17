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
        else
            console.log(clubs);    
    })
});

module.exports = router;