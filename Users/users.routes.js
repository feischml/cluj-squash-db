var express = require('express');
var router = express.Router();

var User = require('./users.controller');

// 1. Create a user (Sign-Up)
router.post('/register', function(req, res){

    console.log(req.body);

    // Validations
    req.checkBody('fullname', 'Fullname is required!').notEmpty();
    req.checkBody('birthdate', 'Birthdate is required!').notEmpty();
    req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.status(495).send(errors);
        console.log(errors);
    }else{
        var user = new User();
        user.fullname = req.body.fullname;
        user.birthdate = req.body.birthdate;
        user.username = req.body.username;
        user.password = req.body.password;
        user.phone = req.body.phone;
        user.admin = req.body.admin;
        user.email = req.body.email;
        // ToDo user.photoid = req.body.photoid;

        User.createUser(user, function(err, cUser){
            if (err)
                res.status(495).send(err);
            else if (cUser)
                res.status(200).send(cUser);
            else    
                res.status(495).send('User creation failed!');
        })
    }

});

// 2. Get Users - http://localhost:3000/users/users
router.get('/users', function(req, res){
    User.getUsers(function(err, users){
        if (err){
            res.status(495).send(err);
            console.log(err);
        } else {
            res.send(users);
            // ToDo delete - for testing purposes write result to console
            console.log(users);  
        }  
    })
});

// 3. Get User by ID - http://localhost:3000/users/userid/:idToSearchForInDb
router.get('/userid/:id', function(req, res){
    // Validation: req.params = { id: 'idToSearchForInDb' };
	req.checkParams('id', 'User id is required!').notEmpty().isHexadecimal();

    // Check validation error
    var errors = req.validationErrors();
    if (errors){
        res.status(495).send(errors);
        console.log(errors);
    } else {   
        var query = { _id: req.params.id };
        executeUserDbQuery(query, res);
    }
});

function executeUserDbQuery(query, res){
    User.getUser(query, function(err, user){
            if (err)
                console.log(err);
            else{
                if (!user)
                    res.status(495).send("User not found!");
                else {
                    res.send(user);  
                }
            }    
        });
}

// Export Router
module.exports = router;

