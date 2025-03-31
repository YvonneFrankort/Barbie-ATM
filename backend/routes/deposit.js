const express = require('express');
const router = express.Router();
const deposit = require('../models/deposit_model');

router.post('/', function (request, response) {
    const { account_id, amount } = request.body;
    
    if ( !account_id || !amount) {
        return response.status(400).json({message: "account_id and amount are required."});
    }
    deposit.addDeposit(account_id, amount, function(err, result){
        if(err){
            response.status(500).json(err);
        }
        else {
            response.status(201).json({message: "Deposit added!"});
        }
    });
});

module.exports = router;