var config = { };

// Config MongooDB - Database name
config.mongoose = { 
    root: "mongodb://localhost/",
    dbname: "clujsquash" 
};

// Config Express port to listen
config.express = { port: 3000};

// Config Origin url (UI app URL - Angular)
config.origin = { url: "http://localhost:4200"};

module.exports = config;