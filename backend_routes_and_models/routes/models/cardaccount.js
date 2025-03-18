const express = require('express');
const router = express.Router();
const cardaccount = require('../models/cardaccount_model');

//get all cardaccounts
router.get('/', function (reqest, response) {
    cardaccount.getAll(function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

//get accounts linked to card
router.get('/card/:card_id', function (reqest, response) {
    cardaccount.getByCardId(req.params.card_id, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

//get cards linked to account
router.get('/account/:account_id', function (reqest, response) {
    cardaccount.getByAccountId(req.params.account_id, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

//link card to account
router.post('/', function (reqest, response) {
    cardaccount.add(req.body, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

//delete card and account
router.delete('/:card_id/:account_id', function (reqest, response) {
    cardaccount.delete(req.params.card_id, req.params.account_id, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;