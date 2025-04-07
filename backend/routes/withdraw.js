const express = require('express');
const router = express.Router();
const withdraw = require('../models/withdraw_model');
const balance = require('../models/balance_model');
const account = require('../models/account_model');

router.post('/', function (request, response) {
    const { rfid_code, amount } = request.body;
    console.log("Received withdrawal request:", { rfid_code, amount }); // Debug

    if (!rfid_code || !amount) {
        console.log("Error: rfid_code or amount missing"); // Debug
        return response.status(400).json({ message: "rfid_code and amount are required." });
    }

    balance.getBalance(rfid_code, function (err, result) {
        if(err) {
            console.error("Error getting balance:", err); // Debug
            return response.status(500).json(err);
        }
        if (result.length === 0) {
            console.log("Card not found for rfid_code:", rfid_code); // Debug
            return response.status(404).json({ message: "Card not found." });
        }
        let availableBalance = result[0].balance;
        console.log("Available balance retrieved:", availableBalance); // Debug

        account.checkAccountType(rfid_code, function(err, result){
            if(err) {
                console.error("Error checking account type:", err); // Debug
                return response.status(500).json(err);
            }
            if (result.length === 0) {
                console.log("Account not found for rfid_code:", rfid_code); // Debug
                return response.status(404).json({ message: "Card not found." });
            }
            const account_type = result[0].account_type;
            console.log("Account type:", account_type); // Debug


            balance.getCreditLimit(rfid_code, function(err, result){
                if(err) {
                    console.error("Error getting credit limit:", err); // Debug
                    return response.status(500).json(err);
                }
                if (result.length === 0) {
                    console.log("Credit limit not found for rfid_code:", rfid_code); // Debug
                    return response.status(404).json({ message: "Card not found." });
                }
                const credit_limit = result[0].credit_limit;
                console.log("Credit limit:", credit_limit); // Debug


                if (account_type === "credit") {
                    // Credit account withdrawal logic
                    const totalBalance = parseFloat(availableBalance) + parseFloat(credit_limit);
                    console.log("Credit account detected. Total available balance (including credit):", totalBalance); // Debug
                
                    console.log("Requested withdrawal amount:", amount); // Debug
                    if (amount > totalBalance) {
                        console.log("Insufficient funds. Available:", totalBalance, "Requested:", amount); // Debug
                        return response.status(400).json({ message: "Insufficient funds." });
                    }
                
                    // Proceed with withdrawal
                    withdraw.addWithdraw(rfid_code, amount, function (err, result) {
                        if (err) {
                            console.error("Error adding withdrawal:", err); // Debug
                            return response.status(500).json(err);
                        }
                        console.log("Withdrawal successful:", result); // Debug
                        response.status(200).json({ message: "Withdrawal successful.", result });
                    });
                } else {
                    withdraw.addWithdraw(rfid_code, amount, function (err, result) {
                        if (err) {
                            console.error("Error adding withdrawal:", err); // Debug
                            return response.status(500).json(err);
                        }
                        console.log("Withdrawal successful:", result); // Debug
                        response.status(200).json({ message: "Withdrawal successful.", result });
                    });
                }
            });
                });
            });
});


module.exports = router;
