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

// Create a new account
router.post('/', function (req, res) {
    account.add(req.body, function (err, result) { 
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json({ message: "Account created!", account_id: result.insertId });
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
        } else {
            res.json({ message: "Account deleted!" });
        }
    });
});

module.exports = router;
