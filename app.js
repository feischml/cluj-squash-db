console.log("Cluj-Squash-DB running");

// Import mongoose, express, express-validator and cors
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const expressValidator = require('express-validator');

// Add routing to Express App
var appRouting = require('./routes');

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
// Add Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.');
      var root = namespace.shift();
      var formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// Set cors - calls from other apps to be possible
app.use(cors({ origin: config.origin.url }));
// Add routers
appRouting.initRoutes(app);



// Start listening to port -> you can start now the localhost:port and see what happens
app.listen(config.express.port, function(){
    console.log("Server started on port: " + config.express.port);
});

