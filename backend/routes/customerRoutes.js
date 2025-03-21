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
            response.json(result[0]); // palauta json object
        }
    })
});

router.post('/', function(request, response){
    customer.add(request.body, function(error, result){
        if(error){
            console.log("Error in customer.add: ", error);
            response.json(error);
        }
        else{
            console.log("Result in customer.add: ", result);
            response.json
            ({
                message: "Custommer added succesfully",
                affectedRows: result.affectedRows
            }); // returns number of affected rows
        }
    })
});

/*
// GET all customers
router.get('/', (req, res) => {
    database.query('SELECT * FROM customer', (err, results) => {
        if(err) return res.status(500).json({error:err.message});
        res.json(results);
    });
});

// GET customer by id
router.get('/:id', (req, res)=>{
    const {id} = req.params;
    database.query('SELECT * FROM customer WHERE customer_id = ?',
        [id], (err, results) =>{
            if(err) return res.status(500).json({error:err.message});
            if(results.length === 0) return res.status(404).json({message: "Customer not found"});
            res.json(results[0]);
        });
});

// POST a new customer
router.post('/', (req, res) => {
    const {firstname, secondname} = req.body;
    if(!firstname || !secondname){
        return res.status(400).json({message: "Firstname and secondname are required"});
    }

    database.query("INSERT INTO customer (firstname, secondname) VALUES (?, ?)",
        [firstname, secondname], (err, result) => {
            if(err) return res.status(500).json({error:err.message});
            res.status(201).json({message: "Customer created successfully", customer_id: result.insertId});
        });
});
*/
// PUT (update) a customer
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {firstname, secondname} = req.body;

    database.query("UPDATE customer SET firstname = ?, secondname = ? WHERE customer_id = ?",
        [firstname, secondname, id], (err, result) => {
            if (err) return res.status(500).json({error: err.message});
            if(result.affectedRows === 0) return res.status(404).json({message: "Customer not found"});
            res.json({message: "Customer updated successfully"}); 
        });
});

// DELETE a customer
router.delete('/:id', (req, res) => {
    const {id} = req.params;

    database.query("DELETE FROM customer WHERE customer_id = ?",
        [id], (err, result) => {
            if(err) return res.status(500).json({error: err.message});
            if(result.affectedRows === 0) return res.status(404).json({message: "Customer not found"});
            res.json({message: "Customer deleted successfully"});
        });
});

module.exports = router;