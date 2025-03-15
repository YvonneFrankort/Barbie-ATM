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

module.exports=router;