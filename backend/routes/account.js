const express = require('express');
const router = express.Router();
const account = require('../models/account_model');  

// Get all accounts
router.get('/', function (request, response) {
    account.getAll(function (err, result) {
        if (err) {
            response.status(500).json(err);  
        } else {
            response.json(result);
        }
    });
});

// Get account by ID
router.get('/:id', function (request, response) {
    account.getById(request.params.id, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else if (result.length === 0) {  
            response.status(404).json({ message: "Account not found" });
        } else {
            response.json(result[0]);
        }
    });
});

// check account type
router.get('/:id/account_type', function(request,response){
    account.checkAccountType(request.params.id, function(err,result){
        if(err){
            response.status(500).json(err);
        }
        else if (result.length === 0){
            response.status(404).json({message: "Account not found"});
        }
        else {
            response.json(result[0]);
        }
    });
});

// get account number by rfid_code
router.get('/:id/account_number', function(request,response){
    account.getAccountNumber(request.params.id, function(err,result){
        if(err){
            response.status(500).json(err);
        }
        else if (result.length === 0){
            response.status(404).json({message: "Account not found"});
        }
        else {
            response.json(result[0]);
        }
    });
});

//get account by customer id
router.get('/customer/:customer_id', function (req, res) {
    account.getByCustomerId(req.params.customer_id, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
});

// Create a new account
router.post('/', function (req, res) {
    const { customer_id, account_type, balance, credit_limit } = req.body;

    // required fields
    if (!customer_id || !account_type || balance === undefined) {
        return res.status(400).json({ error: "Missing: customer_id, account_type, and balance" });
    }

    // account type and credit limit rules
    if (account_type === "debit") {
        req.body.credit_limit = null; // Debit accounts cannot have a credit limit
    } else if (["credit", "double"].includes(account_type)) {
        if (!credit_limit || credit_limit <= 0) {
            return res.status(400).json({ error: `${account_type} accounts must have a valid credit_limit` });
        }
    } else {
        return res.status(400).json({ error: "Invalid account type. Must be 'debit', 'credit', or 'double'." });
    }

    // Insert account into the database
    account.add(req.body, function (err, result) {
        if (err) {
            res.status(500).json({ error: "Database error", details: err });
        } else {
            res.status(201).json({ message: "Account created successfully!", account_id: result.insertId });
        }
    });
});


// Update account by ID
router.put('/:id', function (req, res) {
    account.update(req.params.id, req.body, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: "Account updated!" });
        }
    });
});

// Delete account by ID
router.delete('/:id', function (req, res) {
    account.delete(req.params.id, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else if (result.affectedRows === 0) {  // Check if any row was deleted
            res.status(404).json({ message: "Account not found or already deleted" });
        } else {
            res.json({ message: "Account deleted successfully!" });
        }
    });
});


module.exports = router;
