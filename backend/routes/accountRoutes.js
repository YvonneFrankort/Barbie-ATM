const express = require('express');
const router = express.Router();
const database = require('../database');
  

// Get all accounts
router.get('/', (req, res) => {
    database.query('SELECT * FROM account', (err, results) => {
        if(err){
            return res.status(500).json({message: err.message});
        }
        res.json(results);
    });
});

// Get account by id
router.get('/:id', (req, res) => {
    const account_id = req.params.id;
    database.query("SELECT * FROM account WHERE account_id = ?", [account_id], (err, results) => {
        if(err){
            return res.status(500).json({error:err.message});
        }
        if(results.length === 0){
            return res.status(404).json({message: 'Account not found'});
        }
        res.json(results[0]);
    });
});

// Create a new account
router.post('/', (req, res) => {
    console.log("Request body: ", req.body); // Debugging step

    const{customer_id, balance, account_type, credit_limit} = req.body;
    if (balance === undefined){
        return res.status(400).json({message: 'Balance is required'});
    }

    database.query("INSERT INTO account (customer_id, balance, account_type, credit_limit) VALUES (?, ?, ?, ?)",
        [customer_id, balance, account_type, credit_limit], 
        (err, result) => {
            if(err){
                return res.status(500).json({message: err.message});
            }
            res.status(201).json({message: 'Account created succesfully', account_id: result.insertId});
        });
});

// Update an account
router.put('/:id', (req, res) => {
    const account_id = req.params.id;
    const{balance, credit_limit} = req.body;

    database.query("UPDATE account SET balance = ?, credit_limit = ? WHERE account_id = ?",
        [balance, credit_limit, account_id],
        (err, result) => {
            if(err){
                return res.status(500).json({error: err.message});
            }
            res.json({message: "Account updated successfully"});
        });
});

// Delete an account
router.delete('/:id', (req, res) => {
    const account_id = req.params.id;
    database.query("DELETE FROM account WHERE account_id = ?", [account_id], (err, result) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.json({message: "Account deleted succesfully"});
    });
});

module.exports = router;