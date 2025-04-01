const express = require('express');
const router = express.Router();
const withdraw = require('../models/withdraw_model');
const balance = require('../models/balance_model');

router.post('/', function (request, response) {
    const { rfid_code, amount } = request.body;
    
    if ( !rfid_code || !amount) {
        return response.status(400).json({message: "rfid_code and amount are required."});
    }

    balance.getBalance(rfid_code, function(err, result){
        if(err) {
            return response.status(500).json({ message: "Error retrieving balance", error: err });
        }
        if (result.length === 0) {
            return response.status(404).json({message: "Accunt not found"});
        }
        const currentBalance = result[0].balance;

        if(amount > currentBalance) {
            return response.status(400).json({message: "Insufficient balance in your account"})
        }

        withdraw.addWithdraw(rfid_code, amount, function(err, result){
            if(err){
                return response.status(500).json({message: "Error processing withdrawal", error: err});
            }
            else {
                response.status(201).json({message: "Withdraw added!"});
            }
        });
    });
});

module.exports = router;