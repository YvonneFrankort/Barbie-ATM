const express = require('express');
const router = express.Router();
const database = require('../database');

// Get all transactions
router.get('/', (req, res) => {
    database.query('SELECT * FROM transaction', (err, results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
});

// Get transaction by id
router.get('/:id', (req, res) => {
    const transaction_id = req.params.id;
    database.query("SELECT * FROM transaction WHERE transaction_id = ?",
        [transaction_id], (err, results) => {
            if(err){
                return res.status(500).json({error: err.mesage});
            }
            if(results.length === 0){
                return res.status(404).json({message: 'Transaction not found'});
            }
            res.json(results[0]);
        });
});

// Create a new transaction
router.post('/', (req, res) => {
    const{transaction_id, account_id, card_id, date, transaction_type, summa, customer_id} = req.body;
    if(account_id === undefined || card_id === undefined || date === undefined || transaction_type === undefined || summa === undefined || customer_id === undefined) {
        return res.status(400).json({message: 'All fields are required'});
    }

    database.query("INSERT INTO transaction(account_id, card_id, date, transaction_type, summa, customer_id) VALUES (?,?,?,?,?,?)",
        [account_id, card_id, date, transaction_type, summa, customer_id],
        (err, result) => {
            if(err){
                return res.status(500).json({message:err.message});
            }
            res.status(201).json({message: 'Transaction created successfully', transaction_id: result.insertId});
        });
});

// Update a transaction
router.put('/:id', (req, res) => {
    const transaction_id = req.params.id;
    const{account_id, card_id, date, transaction_type, summa, customer_id} = req.body;

    const sql = `
        UPDATE transaction
        SET account_id = ?, card_id = ?, date = ?, transaction_type = ?, summa = ?, customer_id = ?
        WHERE transaction_id = ?
        `;

    database.query(sql, [account_id, card_id, date, transaction_type, summa, customer_id, transaction_id],
    (err, result) => {
        if(err){
            return res.status(500).json({error:err.message});
        }
        if(result.affectedRows === 0){
            return res.status(404).json({message: "Transaction not found"});
        }
        res.json({message: "Transaction updated successfully"});
    });
});

// Delete a transaction
router.delete('/:id', (req, res) => {
    const transaction_id = req.params.id;
    database.query("DELETE FROM transaction WHERE transaction_id = ?",
        [transaction_id], (err, result) => {
            if(err){
                return res.status(500).json({error:err.message});
            }
            res.json({message: "Transaction deleted successfully"});
        });
});

module.exports = router;