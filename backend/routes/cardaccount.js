const express = require('express');
const router = express.Router();
const cardaccount = require('../models/cardaccount_model');

// Get all card-account links
router.get('/', function (request, response) {
    console.log("NÄETKÖ MINUT??")
    cardaccount.getAll(function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json(result);
        }
    });
});

// Get accounts linked to a specific card
router.get('/:card_id?', function (request, response) {
    console.log("NÄETKÖ MINUT??")
    cardaccount.getByCardId(request.params.card_id, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json(result);
        }
    });
});

// Get cards linked to a specific account
router.get('/cardaccount/:account_id', function (request, response) {
    cardaccount.getByAccountId(request.params.account_id, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json(result);
        }
    });
});

// Link a card to an account
router.post('/', function (request, response) {
    const { card_id, account_id } = request.body;

    if (!card_id || !account_id) {
        return response.status(400).json({ message: "card_id and account_id are required" });
    }

    cardaccount.add(request.body, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(201).json({ message: "Card linked to account!", result });
        }
    });
});

// Update a card-account link 
router.put('/:card_id/:account_id', function (request, response) {
    const { new_account_id } = request.body;

    if (!new_account_id) {
        return response.status(400).json({ message: "new_account_id is required" });
    }

    cardaccount.update(request.params.card_id, request.params.account_id, new_account_id, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json({ message: "Card-account link updated!", result });
        }
    });
});

// Delete a card-account link
router.delete('/:card_id/:account_id', function (request, response) {
    cardaccount.delete(request.params.card_id, request.params.account_id, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            response.json({ message: "Card-account link deleted!", result });
        }
    });
});

module.exports = router;
