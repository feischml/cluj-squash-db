var passport = require('passport'); // authentication
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var router = express.Router();
var resultHandler = require('../response.handler');
var roleConstants = require('../Roles/roles.constants');

// Require User and Role Schema
var User = require('../Users/users.controller');
var Role = require('../Roles/roles.controller');

// Define the Local Auth Strategy
passport.use(new LocalStrategy(
	function (username, password, done) {

        var user = new User();
        user.username = username;
        user.password = password;

        var query = { username: user.username };
        User.getUser(query, function(err, gUser){
            if (err)
                res.status(495).send(err);
            if (!gUser) 
				return done(null, false, { message: 'User not found!' });
            // Check the Password
            User.comparePassword(user.password, gUser.password, function(err, match){
                if (err)
                    res.status(495).send(err);
                else if (match)
                    return done(null, gUser)
                else    
                    return done(null, false, { message: 'Incorrect password!' });  
            });
        });
    })
);

// Function for loging in
function login(req, res, next) {
	passport.authenticate('local',
		function (err, user, info) {
			if (err) 
				return next(err);
			if (!user)
                res.status(495).send(info.message)
			req.logIn(user, function(err){
				if (err)
					return next(err);
				else
                    // Check also if User is Admin
                    var adminRoleFound = false;
                    var userRoles = user.roleIds;
                    userRoles.forEach(function(role) {
                        if (role){
                            var query = { _id: role };
                            Role.getRole(query, function(err,gRole){
                                if (gRole['roletype'] == roleConstants.adminRoleType){
                                    adminRoleFound = true;
                                    res.status(200).send({ user: user, admin: adminRoleFound });
                                    return;
                                    // ToDo Async check of roles************************** not admin users are not returned
                                }
                            })
                        }
                    }, this);
			});
		}
    )(req, res, next)
};

// Login User        
router.post('/login', login);

// Logout User
router.get('/logout', function (req, res){
    req.logout();
    res.status(200).send("Logout Successful!");
});

// Passport needs to be able to serialize and deserialize users to support persistent login sessions
passport.serializeUser(function (user, done) {
	if (user) 
        done(null, user._id);
});

// Desieralize user will call with the unique id provided by serialize user
passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

// Export Router
module.exports = router;