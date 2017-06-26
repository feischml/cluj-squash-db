var express = require('express');
var router = express.Router();

var User = require('./users.controller');
var Player = require('../Players/players.controller');
var Coach = require('../Coaches/coaches.controller');
var Role = require('../Roles/roles.controller');
var roleConstants = require('../Roles/roles.constants');

// 1. Create a user (Sign-Up) and also based on the selected Roles(Player/Coach) the necessary data entry
router.post('/register', function (req, res) {
    // Validations
    req.checkBody('fullname', 'Fullname is required!').notEmpty();
    req.checkBody('birthdate', 'Birthdate is required!').notEmpty();
    req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('roleIds', 'At least basic User Role is required').notEmpty();
    // Todo photoId validation

    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {
        var user = new User();
        user.fullname = req.body.fullname;
        user.birthdate = req.body.birthdate;
        user.username = req.body.username;
        user.password = req.body.password;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.roleIds = req.body.roleIds;
        // ToDo user.photoid = req.body.photoid;

        User.createUser(user, function (err, cUser) {
            if (err)
                res.status(495).send(err);
            else if (cUser)
                // User creation successfull - do the rest
                createPlayerCoach(cUser, res);
            else
                res.status(495).send('User creation failed!');
        })
    }

});

// 2. Get Users - http://localhost:3000/users/users
router.get('/users', function (req, res) {
    User.getUsers(function (err, users) {
        if (err)
            res.status(495).send(err);
        else
            res.status(200).send(users);
    })
});

// 3. Get User by ID - http://localhost:3000/users/userid/:idToSearchForInDb
router.get('/userid/:id', function (req, res) {
    // Validation: req.params = { id: 'idToSearchForInDb' };
    req.checkParams('id', 'User id is required!').notEmpty().isHexadecimal();

    // Check validation error
    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {
        var query = { _id: req.params.id };
        executeUserDbQuery(query, res);
    }
});


// 4. Update User
router.put('/update', function (req, res) {
    // Validation
    req.checkBody('_id', 'User id is required!').notEmpty();

    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {
        var user = new User();
        user._id = req.body._id;
        user.fullname = req.body.fullname;
        user.birthdate = req.body.birthdate;
        user.username = req.body.username;
        user.password = req.body.password;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.roleIds = req.body.roleIds;
        // ToDo user.photoid = req.body.photoid;

        User.updateUser(user, function (err, uUser) {
            if (err)
                res.status(495).send(err);
            else if (uUser)
                res.status(200).send(uUser); // Return back the updated data
            else
                res.status(401).send("User updated not ok");
        });
    }
});

// 5. Delete User
router.delete('/delete/:id', function (req, res) {
    // Validation
    req.checkParams('id', 'User id is required!').notEmpty().isHexadecimal();

    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {
        let userId = req.params.id;
        User.deleteUser(userId, function (err, dUser) {
            if (err)
                res.status(495).send(err);
            else if (!dUser)
                res.status(495).send("User could not be deleted!");
            else
                // Delete also Player and Coach if these roles are present
                deletePlayerCoach(dUser, res);
        });
    }
});

// Execute DB query based on given conditions
function executeUserDbQuery(query, res) {
    User.getUser(query, function (err, user) {
        if (err)
            res.status(495).send(err);
        else if (!user)
            res.status(495).send("User not found!");
        else
            res.status(200).send(user);
    });
};

// Create Player/Coach table entry
function createPlayerCoach(cUser, res) {
    let roles = cUser.roleIds;
    var createStatus = true; // we assume that everything will go well
    roles.forEach(function (element) {
        if (element) {
            let query = { _id: element };
            Role.getRole(query, function (err, role) {
                if (err)
                    res.status(495).send(err);
                else if (!role) {
                    res.status(495).send("Role not found!");
                    return;
                } else
                    switch (role.roletype) {
                        // Create Player
                        case roleConstants.playerRoleType:
                            var player = new Player();
                            player.userId = cUser._id;
                            Player.createPlayer(player, function (err, cPlayer) {
                                if (err)
                                    res.status(495).send(err);
                                else if (!cPlayer) // Player creation went wrong
                                    createStatus = false;
                            });
                            break;
                        // Create Coach
                        case roleConstants.coachRoleType:
                            var coach = new Coach();
                            coach.userId = cUser._id;
                            Coach.createCoach(coach, function (err, cCoach) {
                                if (err)
                                    res.status(495).send(err);
                                else if (!cCoach) // Coach creation went wrong
                                    createStatus = false;
                            });
                            break;
                    }
            });
        }
    }, this);
    if (createStatus == true)
        res.status(200).send(cUser);
    else
        res.status(400).send("User registration went wrong");
};

// Delete Player/Coach table entry based on User role
function deletePlayerCoach(dUser, res) {
    let roles = dUser.roleIds;
    var deleteStatus = true; // we assume that everything will go well
    roles.forEach(function (element) {
        if (element) {
            let query = { _id: element };
            Role.getRole(query, function (err, role) {
                if (err)
                    res.status(495).send(err);
                else {
                    if (!role) {
                        res.status(495).send("Role not found!");
                        return;
                    } else {
                        switch (role.roletype) {
                            // Delete Player
                            case roleConstants.playerRoleType:
                                Player.deletePlayerByUserId(dUser, function (err, dPlayer) {
                                    if (err)
                                        res.status(495).send(err);
                                    else if (!dPlayer) // Player deletation went wrong
                                        deleteStatus = false;
                                });
                                break;
                            // Delete Coach
                            case roleConstants.coachRoleType:
                                Coach.deleteCoachByUserId(dUser, function (err, dCoach) {
                                    if (err)
                                        res.status(495).send(err);
                                    else if (!dCoach) // Coach deletation went wrong
                                        deleteStatus = false;
                                });
                                break;
                        }
                    }
                }
            });
        }
    }, this);
    if (deleteStatus == true)
        res.status(200).send(dUser);
    else
        res.status(400).send("User deletation went wrong");
}

// Export Router
module.exports = router;

