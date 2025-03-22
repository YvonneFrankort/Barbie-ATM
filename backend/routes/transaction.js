const express = require('express');
const router = express.Router();
const transaction = require('../models/transaction_model');
const account = require('../models/account_model'); 

// Get all transactions
router.get('/', function (req, res) {
    transaction.getAll(function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
});

// Get a transaction by ID
router.get('/:id', function (request, response) {
    transaction.getById(request.params.id, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else if (!result || result.length === 0) {  // Check if result is null or empty
            response.status(404).json({ message: "Transaction not found" });
        } else {
            response.json(result[0]); 
        }
    });
});

// Add a new transaction 
router.post('/', function (req, res) {
    const { account_id, card_id, transaction_type, customer_id } = req.body;
    const summa = Number(req.body.summa); // Convert summa to a number

    if (!account_id || !transaction_type || isNaN(summa) || !customer_id) {
        return res.status(400).json({ error: "Missing or invalid required fields" });
    }

    // Step 1: Get account details
    account.getById(account_id, function (err, result) {
        if (err) return res.status(500).json(err);
        if (!result || result.length === 0) return res.status(404).json({ error: "Account not found" });

        let accountDetails = result[0]; // Fix: Get first result object
        let newBalance = accountDetails.balance;

        if (newBalance === undefined) {
            return res.status(500).json({ error: "Failed to fetch account balance" });
        }

        console.log("Current balance:", newBalance);
        console.log("Transaction amount:", summa);

        if (transaction_type === "withdraw") {
            newBalance -= summa;
            if (accountDetails.account_type === "debit" && newBalance < 0) {
                return res.status(400).json({ error: "Insufficient balance for debit account" });
            }
            if (accountDetails.account_type === "credit" && newBalance < -accountDetails.credit_limit) {
                return res.status(400).json({ error: "Credit limit exceeded" });
            }
        } else if (transaction_type === "deposit") {
            newBalance += summa;
        }

        console.log("New balance after transaction:", newBalance);

        // Step 2: Add transaction
        transaction.add(req.body, function (err, result) {
            if (err) return res.status(500).json(err);

            // Step 3: Update balance
            if (!isNaN(newBalance)) {
                account.updateBalance(account_id, newBalance, function (err) {
                    if (err) return res.status(500).json(err);
                    res.status(201).json({ message: "Transaction added!", transaction_id: result.insertId });
                });
            } else {
                return res.status(500).json({ error: "Invalid balance calculation" });
            }
        });
    });
});


// Update a transaction by ID
router.put('/:id', function (req, res) {
    transaction.update(req.params.id, req.body, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: "Transaction updated!" });
        }
    });
});


// Delete a transaction (DELETE)
router.delete('/:id', function (req, res) {
    transaction.getById(req.params.id, function (err, transactionDetails) {
        if (err) return res.status(500).json(err);
        if (!transactionDetails) return res.status(404).json({ error: "Transaction not found" });

        // Reverse transaction before deleting
        const { account_id, summa, transaction_type } = transactionDetails;
        account.getById(account_id, function (err, accountDetails) {
            if (err) return res.status(500).json(err);
            if (!accountDetails) return res.status(404).json({ error: "Account not found" });

            let reversedBalance = accountDetails.balance;
            if (transaction_type === "withdraw") reversedBalance += summa;
            if (transaction_type === "deposit") reversedBalance -= summa;

            // Update balance before deleting transaction
            account.updateBalance(account_id, reversedBalance, function (err) {
                if (err) return res.status(500).json(err);

                // Now delete the transaction
                transaction.delete(req.params.id, function (err) {
                    if (err) return res.status(500).json(err);
                    res.json({ message: "Transaction deleted!" });
                });
            });
        });
    });
});

module.exports = router;



