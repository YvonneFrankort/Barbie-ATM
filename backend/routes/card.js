const express = require('express');
const router = express.Router();
const card = require('../models/card_model');

// Get all cards
router.get('/', function (request, response) {
    card.getAll(function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json(result);
        }
    });
});

// Get a card by ID
router.get('/:card_id', function (request, response) {
    card.getById(request.params.card_id, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json(result[0]); // Return a single card object
        }
    });
});

// Add a new card (Now includes rfid_code)
router.post('/', function (request, response) {
    const { customer_id, pin_code, rfid_code } = request.body;

    if (!customer_id || !pin_code || !rfid_code) {
        return response.status(400).json({ message: "customer_id, pin_code, and rfid_code are required" });
    }
    card.add(request.body, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(201).json({ message: "Card added!", card_id: result.insertId });
        }
    });
});

// Update card (Now includes rfid_code)
router.put('/:card_id', function (request, response) {
    const { pin_code, rfid_code } = request.body;

    if (!pin_code || !rfid_code) {
        return response.status(400).json({ message: "pin_code and rfid_code are required" });
    }

    card.update(request.params.card_id, request.body, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json({ message: "Card updated!" });
        }
    });
});

// Delete a card
router.delete('/:card_id', function (request, response) {
    card.delete(request.params.card_id, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json({ message: "Card deleted!" });
        }
    });
});

module.exports = router;


