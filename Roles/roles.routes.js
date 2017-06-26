var express = require('express');
var router = express.Router();

var Role = require('./roles.controller');

// 1. Create Role
router.post('/create', function(req, res){
    // Validation
    req.checkBody('roletype', 'Type is required!').notEmpty();
    req.checkBody('name', 'Name is required!').notEmpty();
    req.checkBody('description', 'Description is required!').notEmpty();

    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {
        var role = new Role();
        role.roletype       = req.body.roletype;
		role.name           = req.body.name;
		role.description    = req.body.description;
        role.admin          = req.body.admin;

        Role.createRole(role, function(err, cRole){
            if (err)
				res.status(495).send(err);
			else if (cRole)
                res.status(200).send(cRole); // Return back the created data
			else
				res.status(400).send("Role not created");
        });

    }
});

// 1.b. Update Role
router.put('/update', function(req, res){
    // Validation
	req.checkBody('_id', 'Role id is required!').notEmpty();

	var errors = req.validationErrors();
	if (errors)
		res.status(495).send(errors);
	else {
        var role = new Role();
		role._id            = req.body._id;
		role.name           = req.body.name;
		role.description    = req.body.description;
		role.roletype       = req.body.roletype;
        role.admin          = req.body.admin;

		Role.updateRole(role, function (err, uRole) {
			if (err)
				res.status(495).send(err);
			else if (uRole)
                res.status(200).send(uRole); // Return back the updated data
			else
				res.status(400).send("Role updated not ok");
		});
    }
});

// 2. Get Roles - http://localhost:3000/roles/roles
router.get('/roles', function(req, res){
    Role.getRoles(function(err, roles){
        if (err)
            res.status(495).send(err);
        else 
            res.status(200).send(roles); 
    })
});

// 3. Get Club by id - http://localhost:3000/roles/roleid/:idToSearchForInDb
router.get('/roleid/:id', function(req, res){
    // Validation: req.params = { id: 'idToSearchForInDb' };
	req.checkParams('id', 'Role id is required!').notEmpty().isHexadecimal();

    // Check validation error
    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {   
        var query = { _id: req.params.id };
        executeRoleDbQuery(query, res);
    }
});

function executeRoleDbQuery(query, res){
    Role.getRole(query, function(err, role){
            if (err)
                res.status(495).send(err);
            else if (!role)
                res.status(495).send("Role not found!");
            else 
                res.status(200).send(role);    
        });
}

// Export Router
module.exports = router;