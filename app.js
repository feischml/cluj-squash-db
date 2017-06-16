console.log("Cluj-Squash-DB running");

// Import mongoose and express
const express = require('express');
const mongoose = require('mongoose');

// Connect to the name of the DB = clujsquash
mongoose.connect('mongodb://localhost/clujsquash');
let db = mongoose.connection;

// Check connection
db.once('open', function(){
    console.log('Connected to mongoDB');
});

// Check for db error
db.on('error', function(err){
    console.log(err);
});

// Init app
const app = express();

// Bring in Models...
