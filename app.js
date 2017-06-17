console.log("Cluj-Squash-DB running");

// Import mongoose, express and cors
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

// Connect to the MongoDB
mongoose.connect(config.mongoose.root + config.mongoose.dbname);
let db = mongoose.connection;

// Check connection
db.once('open', function(){
    console.log('Connected to DB: ' + config.mongoose.dbname );
});

// Check for db error
db.on('error', function(err){
    console.log(err);
});

// Init app
const app = express();

// Set cors - calls from other apps to be possible
app.use(cors({ origin: config.origin.url }));

// Bring in Models, Schemas, Routes

//...

// Start listening to port -> you can start now the localhost:port and see what happens
app.listen(config.express.port, function(){
    console.log("Server srated on port: " + config.express.port);
});

