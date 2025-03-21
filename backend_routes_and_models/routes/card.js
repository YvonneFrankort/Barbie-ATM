const express = require('express');
const router = express.Router();
const card = require('../models/card_model');

//get all cards
router.get('/', function (reqest, response) {
    card.getAll(function(err,result){
            if(err){
                response.json(err);
            }
            else{
                response.json(result);
            }
        });
    });

//get a card by id
router.get('/:card_id', function (reqest, response) {
    card.getById(request.params.id,function(err,result){
            if(err){
            response.json(err);
            }
            else{
            response.json(result[0]);
            }
        });
    });

//add a new card
router.post('/', function (reqest, response) {
    card.add(req.body, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json({ message: "Card added!", card_id: result.insertId });
        }
    });
});

//update card pin
router.put('/:card_id', function (reqest, response) {
    card.update(req.params.id, req.body, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: "Card updated!" });
        }
    });
});

//delete a card
router.delete('/:card_id', function (reqest, response) {
    card.delete(req.params.id, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: "Card deleted!" });
        }
    });
});

module.exports = router;
