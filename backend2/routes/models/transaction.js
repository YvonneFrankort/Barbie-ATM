const express = require('express');
const router = express.Router();
const transaction = require('../models/transaction_model'); // Ensure correct path

// Get all transactions
router.get('/', function (reqest, response) {
    transaction.getAll(function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
});

// Get a transaction by ID
router.get('/:id', function (reqest, response) {
    transaction.getById(req.params.id, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result[0]); // Return a single object
        }
    });
});

// Add a new transaction
router.post('/', function (reqest, response) {
    transaction.add(req.body, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json({ message: "Transaction added!", transaction_id: result.insertId });
        }
    });
});

// Update a transaction
router.put('/:id', function (reqest, response) {
    transaction.update(req.params.id, req.body, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: "Transaction updated!" });
        }
    });
});

// Delete a transaction
router.delete('/:id', function (reqest, response) {
    transaction.delete(req.params.id, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: "Transaction deleted!" });
        }
    });
});

module.exports = router;

