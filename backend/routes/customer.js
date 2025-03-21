const express = require('express');
const router = express.Router();
const customer = require('../models/customer_model');

// Get all customers
router.get('/', function (request, response) {
    customer.getAll(function (err, result) {
        if (err) {
            response.status(500).json({ error: err.message });
        } else {
            response.json(result);
        }
    });
});

// Get customer by ID
router.get('/:id', function (request, response) {
    customer.getById(request.params.id, function (err, result) {
        if (err) {
            response.status(500).json({ error: err.message });
        } else if (result.length > 0) {
            response.json(result[0]); // Return first customer
        } else {
            response.status(404).json({ message: "Customer not found" });
        }
    });
});

// Add a new customer
router.post('/', function (request, response) {
    customer.add(request.body, function (err, result) {
        if (err) {
            response.status(500).json({ error: err.message });
        } else {
            response.status(201).json({ message: "Customer added!", customer_id: result.insertId });
        }
    });
});

// Update customer by ID
router.put('/:id', function (request, response) {
    customer.update(request.params.id, request.body, function (err, result) {
        if (err) {
            response.status(500).json({ error: err.message });
        } else if (result.affectedRows > 0) {
            response.json({ message: "Customer updated!" });
        } else {
            response.status(404).json({ message: "Customer not found or no changes made" });
        }
    });
});

// Delete a customer
router.delete('/:id', function (request, response) {
    customer.delete(request.params.id, function (err, result) {
        if (err) {
            response.status(500).json({ error: err.message });
        } else if (result.affectedRows > 0) {
            response.json({ message: "Customer deleted!" });
        } else {
            response.status(404).json({ message: "Customer not found" });
        }
    });
});

module.exports = router;

