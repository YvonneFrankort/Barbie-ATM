const db = require('../database.js');

const transaction = {
    // Get all transactions
    getAll(callback) {
        return db.query('SELECT * FROM transaction', callback);
    },

    // Get transaction by ID
    getById(transactionId, callback) {
        return db.query('SELECT * FROM transaction WHERE transaction_id = ?', [transactionId], callback);
    },

    // Add a new transaction
    add(newTransaction, callback) {
        return db.query(
            'INSERT INTO transaction (account_id, card_id, date, transaction_type, summa, customer_id) VALUES (?, ?, ?, ?, ?, ?)',
            [
                newTransaction.account_id, 
                newTransaction.card_id, 
                newTransaction.date, 
                newTransaction.transaction_type, 
                newTransaction.summa, 
                newTransaction.customer_id
            ],
            callback
        );
    },

    // Update transaction details
    update(transactionId, updatedTransaction, callback) {
        return db.query(
            'UPDATE transaction SET account_id = ?, card_id = ?, date = ?, transaction_type = ?, summa = ?, customer_id = ? WHERE transaction_id = ?',
            [
                updatedTransaction.account_id, 
                updatedTransaction.card_id, 
                updatedTransaction.date, 
                updatedTransaction.transaction_type, 
                updatedTransaction.summa, 
                updatedTransaction.customer_id, 
                transactionId
            ],
            callback
        );
    },

    // Delete a transaction
    delete(transactionId, callback) {
        return db.query(
            'DELETE FROM transaction WHERE transaction_id = ?', 
            [transactionId], 
            callback
        );
    }
};

module.exports = transaction;
