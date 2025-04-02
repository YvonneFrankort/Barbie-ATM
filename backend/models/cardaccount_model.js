const db = require('../database.js');

const cardaccount = {
    // Get all card-account links
    getAll(callback) {
        db.query('SELECT * FROM cardaccount', (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Get card-account by card ID
    getByCardId(cardId, callback) {
        console.log("täällä!")
        db.query('SELECT * FROM cardaccount WHERE card_id = ?', [cardId], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Get all cards linked to an account
    getByAccountId(accountId, callback) {
        db.query('SELECT * FROM cardaccount WHERE account_id = ?', [accountId], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Add a new card-account
    add(newCardAccount, callback) {
        db.query(
            'INSERT INTO cardaccount (card_id, account_id) VALUES (?, ?)',
            [newCardAccount.card_id, newCardAccount.account_id], 
            (err, result) => {
                if (err) return callback(err, null);
                callback(null, { insertId: result.insertId, message: "Card linked to account!" });
            }
        );
    },

    // Update an existing card-account
    update(cardId, oldAccountId, newAccountId, callback) {
        db.query(
            'UPDATE cardaccount SET account_id = ? WHERE card_id = ? AND account_id = ?',
            [newAccountId, cardId, oldAccountId], 
            (err, result) => {
                if (err) return callback(err, null);
                if (result.affectedRows === 0) return callback({ message: "No record found to update." }, null);
                callback(null, { message: "Card-account link updated!" });
            }
        );
    },

    // Delete a card-account
    delete(cardId, accountId, callback) {
        db.query(
            'DELETE FROM cardaccount WHERE card_id = ? AND account_id = ?',
            [cardId, accountId], 
            (err, result) => {
                if (err) return callback(err, null);
                if (result.affectedRows === 0) return callback({ message: "No record found to delete." }, null);
                callback(null, { message: "Card-account link deleted!" });
            }
        );
    }
};

module.exports = cardaccount;

