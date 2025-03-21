const express = require('express');
const router = express.Router();
const transaction = require('../models/transaction_model'); 

// Get all transactions
router.get('/', function (request, response) {
    transaction.getAll(function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json(result);
        }
    });
});

// Get a transaction by ID
router.get('/:id', function (request, response) {
    transaction.getById(request.params.id, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            if (result.length > 0) {
                response.json(result[0]); 
            } else {
                response.status(404).json({ message: "Transaction not found" });
            }
        }
    });
});

// Add a new transaction
router.post('/', function (request, response) {
    const transactionData = request.body;
    transactionData.date = new Date(); // Auto-set the date

    transaction.add(transactionData, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(201).json({ message: "Transaction added!", transaction_id: result.insertId });
        }
    });
});

// Update a transaction
router.put('/:id', function (request, response) {
    transaction.update(request.params.id, request.body, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json({ message: "Transaction updated!" });
        }
    });
});

// Delete a transaction
router.delete('/:id', function (request, response) {
    transaction.delete(request.params.id, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json({ message: "Transaction deleted!" });
        }
    });
});

module.exports = router;


