var express = require('express');
var router = express.Router();

var Assotiation = require('./associations.controller');

// 1. Create an Assotiation 
router.post('/create', function(req, res){
    // Validation
    req.checkBody('name', 'Type is required!').notEmpty();
    req.checkBody('webpage', 'Name is required!').notEmpty();
    req.checkBody('description', 'Description is required!').notEmpty();

    var errors = req.validationErrors();
    if (errors){
        res.status(495).send(errors);
    } else {
        var association = new Assotiation();
        association.webpage      = req.body.webpage;
		association.name         = req.body.name;
		association.description  = req.body.description;

        Assotiation.createAssociation(association, function(err, cAssociation){
            if (err)
				res.status(495).send(err);
			else if (cAssociation)
                res.status(200).send(cAssociation); // Return back the created data
			else
				res.status(400).send("Associatyion not created");
        });

    }
});


// 2. Get Associations - http://localhost:3000/associations/associations
router.get('/associations', function(req, res){
    Assotiation.getAssociations(function(err, associations){
        if (err){
            res.status(495).send(err);
        } else {
            res.send(associations); 
        }  
    })
});

// 3. Get Association by ID - http://localhost:3000/associations/associationid/:idToSearchForInDb
router.get('/associationid/:id', function(req, res){
    // Validation: req.params = { id: 'idToSearchForInDb' };
	req.checkParams('id', 'Association id is required!').notEmpty().isHexadecimal();

    // Check validation error
    var errors = req.validationErrors();
    if (errors){
        res.status(495).send(errors);
    } else {   
        var query = { _id: req.params.id };
        executeAssotiationDbQuery(query, res);
    }
});


// 4. Update Association
router.put('/update', function(req, res){
    // Validation
	req.checkBody('_id', 'Association id is required!').notEmpty();

	var errors = req.validationErrors();
	if (errors){
		res.status(495).send(errors);
    }
	else {

        var association = new Assotiation();
        association._id = req.body._id;
		association.webpage = req.body.webpage;
        association.description = req.body.description;
        association.name = req.body.name;

		Assotiation.updateAssociation(association, function (err, uAssociation) {
			if (err)
				res.status(495).send(err);
			else if (uAssociation)
                res.status(200).send(uAssociation); // Return back the updated data
			else
				res.status(401).send("Coach updated not ok");
		});
    }
});

// 5. Delete Association
router.delete('/delete/:id', function(req, res){
    // Validation
    req.checkParams('id', 'Association id is required!').notEmpty().isHexadecimal();

    var errors = req.validationErrors();
    if(errors){
        res.status(495).send(errors);
    }else{
         let associationId = req.params.id;
         Assotiation.deleteAssociationById(associationId, function(err,dAssociation){
             if(err){
                 res.status(495).send(err);
             }else{
                 if(!dAssociation){
                    res.status(495).send("Association could not be deleted!");
                 }else{
                    res.status(200).send(dAssociation);
                 }
             }
        });
    }
});

function executeAssotiationDbQuery(query, res){
    Association.getAssociation(query, function(err, association){
            if (err)
                res.status(495).send(err);
            else{
                if (!coach)
                    res.status(495).send("Association not found!");
                else {
                    res.status(200).send(association);
                }
            }    
        });
}

// Export Router
module.exports = router;

