// Import mongoose, express, express-validator and cors
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const expressValidator = require('express-validator');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require("redis");
const client  = redis.createClient();
const bodyParser = require('body-parser');
const passport = require('passport');

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

// Use session for storing the logged user
app.use(session({
  store: new RedisStore(
    { host: 'localhost', port: 6379, client: client,ttl :  260 }
  ),
  secret: "SHHH_HHHH",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge:86400000 }
}));

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

// Passport Init for authentication process
app.use(passport.initialize());
app.use(passport.session());

// Set cors - calls from other apps to be possible
app.use(cors({ origin: config.origin.url }));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allow Methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept");
  next();
});

// Add routers
appRouting.initRoutes(app);

// Start listening to port:number; you can start now the localhost:port and see what happens
app.listen(config.express.port, function(){
    console.log("Server started on port: " + config.express.port);
});

