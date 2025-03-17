const express=require('express');
const router=express.Router();
const customer=require('../models/customer_model');

//get all customers
router.get('/',function(request,response){
    customer.getAll(function(err,result){
        if(err){
            response.json(err);
        }
        else{
            response.json(result);
        }
    });
});

//get customer by id
router.get('/:id',function(request,response){
customer.getById(request.params.id,function(err,result){
        if(err){
        response.json(err);
        }
        else{
        response.json(result[0]);
        }
    });
});

//add a new customer
router.post('/', function (reqest, response) {
    customer.add(req.body, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json({ message: "Customer added!", customer_id: result.insertId });
        }
    });
});

// update customer by ID
router.put('/:id', function (reqest, response) {
    customer.update(req.params.id, req.body, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: "Customer updated!" });
        }
    });
});

// delete a customer
router.delete('/:id', function (reqest, response) {
    customer.delete(req.params.id, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: "Customer deleted!" });
        }
    });
});

module.exports=router;