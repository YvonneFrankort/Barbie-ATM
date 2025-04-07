const express = require('express');
const router = express.Router();
const deposit = require('../models/deposit_model');

router.post('/', function (request, response) {
    const { rfid_code, amount } = request.body;
    
    if ( !rfid_code || !amount) {
        return response.status(400).json({message: "rfid_code and amount are required."});
    }
    deposit.addDeposit(rfid_code, amount, function(err, result){
        if(err){
            response.status(500).json(err);
        }
        else {
            response.status(201).json({message: "Deposit added!"});
        }
    });
});

module.exports = router;