var express = require('express');
var router = express.Router();
var resultHandler = require('../response.handler');
var Role = require('./roles.controller');

// 1. Create Role
router.post('/create', function(req, res){
    // Validation
    req.checkBody('roletype', 'Type is required!').notEmpty();
    req.checkBody('name', 'Name is required!').notEmpty();
    req.checkBody('description', 'Description is required!').notEmpty();
    req.checkBody('basic', 'BASIC role setting is required!').notEmpty();

    var errors = req.validationErrors();
    if (errors)
        res.status(495).send(errors);
    else {

        var role = new Role();
        role.roletype       = req.body.roletype;
		role.name           = req.body.name;
		role.description    = req.body.description;
        role.admin          = req.body.admin;
        role.basic          = req.body.basic;

        Role.createRole(role, function(err, cRole){
            resultHandler.handleResult(err, res, cRole, "Role not created!");
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
        role.basic          = req.body.basic;

		Role.updateRole(role, function (err, uRole) {
            resultHandler.handleResult(err, res, uRole, "Role update not ok!");
		});
    }
});

// 2. Get Roles - http://localhost:3000/roles/roles
router.get('/roles', function(req, res){
    Role.getRoles(function(err, roles){
        resultHandler.handleResult(err, res, roles, "Roles not found!");
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

// 4. Delete Roles
router.delete('/delete/:id', function(req, res){
    // Validation
    req.checkParams('id', 'Role id is required!').notEmpty().isHexadecimal();

    var errors = req.validationErrors();
    if(errors)
        res.status(495).send(errors);
    else{
        let roleId = req.params.id;
        // Get the Role and check if it is BASIC
        var query = { _id: req.params.id };
        Role.getRole(query, function(err, role){
            if (err)
                res.status(495).send(err);
            else if (role)
                if (!role['basic'])
                    Role.deleteRoleById(roleId, function(err, dRole){
                        resultHandler.handleResult(err, res, dRole, "Role could not be deleted!");
                    });
            else
                res.status(400).send("Role not found!");    
        });
    }
});

function executeRoleDbQuery(query, res){
    Role.getRole(query, function(err, role){
        resultHandler.handleResult(err, res, role, "Role not found!");
    });
}

// Export Router
module.exports = router;