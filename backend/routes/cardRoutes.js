const express = require('express');
const router = express.Router();
const database = require('../database');

// Get all cards
router.get('/', (req, res) => {
    database.query('SELECT * FROM card', (err, results) => {
        if(err){
            return res.status(500).json({message: err.message});
        }
        res.json(results);
    });
});

// Get card by id
router.get('/:id', (req, res) => {
    const card_id = req.params.id;
    database.query("SELECT * FROM card WHERE card_id = ?",
        [card_id], (err, results) => {
            if(err){
                return res.status(500).json({error:err.message});
            }
            if(results.length === 0){
                return res.status(404).json({message: 'Card not found'});
            }
            res.json(results[0]);
        });
});

// Create a new card
router.post('/', (req, res) => {
    const{card_id, pin_code, customer_id, rfid_code} = req.body;
    if(pin_code === undefined){
        return res.status(400).json({message: 'Pin code is required'});
    }

    database.query("INSERT INTO card (pin_code, customer_id, rfid_code) VALUES (?,?,?)",
        [pin_code, customer_id, rfid_code],
        (err, result) =>{
            if(err){
                return res.status(500).json({message:err.message});
            }
            res.status(201).json({message: 'Card created successfully', card_id: result.insertId});
        });
});

// Update a card
router.put('/:id', (req, res) => {
    const card_id = req.params.id;
    const{pin_code, rfid_code} = req.body;

    database.query("UPDATE card SET pin_code = ?, rfid_code = ? WHERE card_id = ?",
        [pin_code, rfid_code, card_id],
        (err, result) => {
            if(err){
                return res.status(500).json({error:err.message});
            }
            res.json({message: "Card updated successfully"});
        });
});

// Delete a card 
router.delete('/:id', (req, res) => {
    const card_id = req.params.id;
    database.query("DELETE FROM card WHERE card_id = ?",
        [card_id], (err, result) =>{
            if(err){
                return res.status(500).json({error:err.message});
            }
            res.json({message: "Card deleted successfully"});
        });
});

module.exports = router;