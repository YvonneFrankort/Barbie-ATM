const express = require('express');
const router = express.Router();
const database = require('../database'); // Database connection
const customer = require('../models/customer_model');

router.get('/', function(request, response){
    customer.getAll(function(error, result){
        if(error){
            response.json(error);
        }
        else{
            response.json(result); // returns json array
        }
    })
});

router.get('/:id', function(request, response){
    customer.getById(request.params.id, function(error, result){
        if(error){
            response.json(error);
        }
        else{
            response.json(result[0]); // returns json object
        }
    })
});

router.post('/', function(request, response){
    customer.add(request.body, function(error, result){
        if(error){
            response.json(error);
        }
        else{
            response.json
            ({
                message: "Custommer added succesfully",
                affectedRows: result.affectedRows
            }); // returns number of affected rows
        }
    })
});

router.put('/:id', function(request, response){
    customer.update(request.params.id, request.body, function(error, result){
        if(error){
            response.json(error);
        }
        else{
            response.json(result.affectedRows);
        }
    })

});

router.delete('/:id', function(request, response){
    customer.delete(request.params.id, function(error, result){
        if(error){
            response.json(error);
        }
        else{
            response.json(result.affectedRows);
        }
    })
});

module.exports = router;