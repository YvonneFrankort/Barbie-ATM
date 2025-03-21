const express=require('express');
const router=express.Router();
const customer=require('../models/account_model');

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

//create a new account
router.post('/', function(req, res) {
    account.create(req.body, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "Account created!", id: result.insertId });
        }
    });
});

//update account by id
router.put('/:id', function(req, res) {
    account.update(req.params.id, req.body, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "Account updated!" });
        }
    });
});

//delete account by id
router.delete('/:id', function(req, res) {
    account.delete(req.params.id, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "Account deleted!" });
        }
    });
});

module.exports=router;