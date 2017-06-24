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
    req.checkBody('roleIds', 'At least basic User Role is required').notEmpty();
    // Todo photoId validation

    var errors = req.validationErrors();

    if(errors){
        res.status(495).send(errors);
    }else{
        var user = new User();
        user.fullname = req.body.fullname;
        user.birthdate = req.body.birthdate;
        user.username = req.body.username;
        user.password = req.body.password;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.roleIds = req.body.roleIds;
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
    } else {   
        var query = { _id: req.params.id };
        executeUserDbQuery(query, res);
    }
});


// 4. Update User
router.put('/update', function(req, res){
    // Validation
	req.checkBody('_id', 'User id is required!').notEmpty();

	var errors = req.validationErrors();
	if (errors){
		res.status(495).send(errors);
    }
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
				throw err;
			else if (uUser)
                res.status(200).send(uUser); // Return back the updated data
			else
				res.status(401).send("User updated not ok");
		});
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

