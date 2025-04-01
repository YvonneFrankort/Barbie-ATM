const db = require('../database.js');

const transaction = {
    // Get all transactions
    getAll(callback) {
        return db.query('SELECT * FROM transaction', callback);
    },

    // Get transaction by ID
    getById(id, callback) {
        return db.query(
            'SELECT * FROM transaction WHERE transaction_id = ?', 
            [id], 
            function (err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result); 
                }
            }
        );
    },

    // Get transaction by RFID
    getByRFID(rfid_code, callback) {
        return db.query(
            `SELECT transaction.transaction_id, transaction.date, transaction.transaction_type, transaction.summa, transaction.customer_id
            FROM transaction
            JOIN cardaccount on transaction.account_id = cardaccount.account_id
            JOIN card on card.card_id = cardaccount.card_id
            WHERE card.rfid_code = ?
            ORDER BY transaction.date DESC
            LIMIT 10`, [rfid_code], function(err, result){
                if(err) {
                    callback(err, null);
                }
                else {
                    callback(null, result);
                }
            }
        );
    },

    // Add a new transaction (auto-sets date)
    add(newTransaction, callback) {
        db.query(
            `INSERT INTO transaction (account_id, card_id, transaction_type, summa, customer_id, date)
             VALUES (?, ?, ?, ?, ?, NOW())`,  // NOW() automatically sets the date
            [newTransaction.account_id, newTransaction.card_id, newTransaction.transaction_type, newTransaction.summa, newTransaction.customer_id],
            callback
        );
    },

    // Update an existing transaction
    update(id, updatedTransaction, callback) {
        db.query(
            `UPDATE transaction 
             SET account_id = ?, card_id = ?, transaction_type = ?, summa = ?, customer_id = ?
             WHERE transaction_id = ?`,
            [updatedTransaction.account_id, updatedTransaction.card_id, updatedTransaction.transaction_type, updatedTransaction.summa, updatedTransaction.customer_id, id],
            callback
        );
    },

    // Delete transaction by ID
    delete(id, callback) {
        db.query('DELETE FROM transaction WHERE transaction_id = ?', [id], callback);
    }
};

module.exports = transaction;
