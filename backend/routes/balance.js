const express = require('express');
const router = express.Router();
const balance = require('../models/balance_model');

// Get balance by rfid_code
router.get('/:rfid_code', function (request, response) {
    balance.getBalance(request.params.rfid_code, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            if (result.length > 0) {
                response.json(result[0]); // Return a single balance object
            } else {
                response.status(404).json({ message: "Balance not found" });
            }
        }
    });
});

module.exports = router;