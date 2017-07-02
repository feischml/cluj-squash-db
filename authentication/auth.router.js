var passport = require('passport'); // authentication
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var router = express.Router();
var resultHandler = require('../response.handler');
var roleConstants = require('../roles/roles.constants');

// Require User and Role Schema
var User = require('../users/users.controller');
var Role = require('../roles/roles.controller');

// Define the Local Auth Strategy
passport.use(new LocalStrategy(
	function (username, password, done) {
        var user = new User();
        user.username = username;
        user.password = password;

        var query = { username: user.username };
        User.getUser(query, function(err, gUser){
            if (err)
                return done(err);
            if (!gUser) 
				return done(null, false, { message: 'User not found!' });
            // Check the Password
            User.comparePassword(user.password, gUser.password, function(err, match){
                if (err)
                    return done(null, false);
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
                return res.status(495).send(info.message);
			req.login(user, function(err){
				if (err)
					return next(err);
				else
                    // Check also if User is Admin
                    var adminRoleFound = false;
                    var userRoles = user.roleIds;
                    Role.getRoles(function(err, roles){
                        if (err)
                            return next(err);
                        if (!roles)
                            return res.status(495).send("Roles not found!");
                        else{
                            adminRole = roles.find(function(role){
                                return role.roletype === roleConstants.adminRoleType
                            });
                            if (adminRole){
                                if ( userRoles.indexOf(adminRole['_id']) >= 0 ) // User has Admin Role
                                    adminRoleFound = true;
                                return res.status(200).send({ user: user, admin: adminRoleFound });
                            } else {
                                return res.status(495).send("No Admin Role exists!");
                            }
                        }
                    });
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