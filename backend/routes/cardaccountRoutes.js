const express = require('express');
const router = express.Router();
const database = require('../database');

// Get all records from cardaccount
router.get('/', (req, res) => {
    database.query('SELECT * FROM cardaccount', (err, results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
});

// Get cardaccount by id
router.get('/:card_id/:account_id', (req,res) => {
    const {card_id, account_id} = req.params;

    const sql = `SELECT * FROM cardaccount WHERE card_id = ? AND account_id = ?`;

    database.query(sql, [card_id, account_id], (err, result) => {
        if(err){
            return res.status(500).json({error:err.message});
        }
        if(result.length === 0){
            return res.status(404).json({message: "Cardaccount not found."});
        }
        res.json({data: result[0] });
    });
});

// Create a new cardaccount
router.post('/', (req, res) => {
    const {card_id, account_id} = req.body;

    const sql = `INSERT INTO cardaccount(card_id, account_id) VALUES (?, ?)`;

    database.query(sql, [card_id, account_id], (err, result) => {
        if(err){
            return res.status(500).json({error:err.message});
        }
        res.status(201).json({message: "Cardaccount created successfully", data: {card_id, account_id} });
    });
});

// Update a cardaccount
router.put('/:card_id/:account_id', (req, res) => {
    const {card_id, account_id} = req.params;
    const {new_card_id, new_account_id} = req.body;

    // Debugging: log incoming data to check the body values are correct
    console.log('Received data:', {new_card_id, new_account_id});

    // Check if new_card_id and account_id are provided
    if(!new_card_id || !new_account_id){
        return res.status(400).json({message: "Both new card_id and new account_id are required."});
    }

    // Check if the new card_id and account_id exist in the database
    const sqlCheckCard = 'SELECT card_id FROM card WHERE card_id = ?';
    database.query(sqlCheckCard, [new_card_id], (err, resultCard) => {
        if(err){
            return res.status(500).json({error:err.message});
        }
        if(resultCard.length === 0){
            return res.status(404).json({message: "Card not found."});
        }

        const sqlCheckAccount = 'SELECT account_id FROM account WHERE account_id = ?';
        database.query(sqlCheckAccount, [new_account_id], (err, resultAccount) => {
            if(err){
                return res.status(500).json({error:err.message});
            }
            if (resultAccount.length === 0){
                return res.status(404).json({message: "Account not found."});
            }

        const sql = `
            UPDATE cardaccount
            SET card_id = ?, account_id = ?
            WHERE card_id = ? AND account_id = ?
            `;

        database.query(sql, [new_card_id, new_account_id, card_id, account_id],
            (err, result) => {
                if(err){
                    return res.status(500).json({error:err.message});
                }
                if (result.affectedRows === 0){
                    return res.status(404).json({message: "Cardaccount not found."});
                }
                res.json({message: "Cardaccount updated successfully"});
            });
        });
    });
});

// Delete cardaccount
router.delete('/:card_id/:account_id', (req, res) => {
    const {card_id, account_id} = req.params;

    const sql = `DELETE FROM cardaccount WHERE card_id = ? AND account_id = ?`;

    database.query(sql, [card_id, account_id], (err, result) => {
        if(err){
            return res.status(500).json({error:err.message});
        }
        if(result.affectedRows === 0){
            return res.status(404).json({message: "Cardaccount not found."});
        }
        res.json({message: "Cardaccount deleted successfully"});
    });
});

module.exports = router;