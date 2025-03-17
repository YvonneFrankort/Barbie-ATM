const db = require('../database.js');

const cardaccount = {
    // Get all card-accounts
    getAll(callback) {
        return db.query('SELECT * FROM cardaccount', callback);
    },

    // Get card-account by card id
    getByCardId(cardId, callback) {
        return db.query('SELECT * FROM cardaccount WHERE card_id = ?', [cardId], callback);
    },

    // Get all cards linked to a account
    getByAccountId(accountId, callback) {
        return db.query('SELECT * FROM cardaccount WHERE account_id = ?', [accountId], callback);
    },

    // add a card to the account
    add(newCardAccount, callback) {
        return db.query(
            'INSERT INTO cardaccount (card_id, account_id) VALUES (?, ?)',
            [newCardAccount.card_id, newCardAccount.account_id], 
            callback
        );
    },

    // Delete a card-account
    delete(cardId, accountId, callback) {
        return db.query(
            'DELETE FROM cardaccount WHERE card_id = ? AND account_id = ?',
            [cardId, accountId], 
            callback
        );
    }
};

module.exports = cardaccount;
