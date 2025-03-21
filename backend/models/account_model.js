const db = require('../database.js');

const account = {
    // Get all accounts
    getAll(callback) {
        return db.query('SELECT * FROM account', callback);
    },

    // Get account by ID
    getById(id, callback) {
        return db.query('SELECT * FROM account WHERE account_id = ?', [id], callback);
    },

    // Get account by customer ID
    getByCustomerId(customerId, callback) {
        return db.query('SELECT * FROM account WHERE customer_id = ?', [customerId], callback);
    },

    // Add a new account
    add(newAccount, callback) {
        return db.query(
            'INSERT INTO account (customer_id, balance, account_type, credit_limit) VALUES (?, ?, ?, ?)',
            [newAccount.customer_id, newAccount.balance, newAccount.account_type, newAccount.credit_limit],
            callback
        );
    },

    // Update account by ID
    update(id, updatedAccount, callback) {
        return db.query(
            'UPDATE account SET balance = ?, account_type = ?, credit_limit = ? WHERE account_id = ?',
            [updatedAccount.balance, updatedAccount.account_type, updatedAccount.credit_limit, id],
            callback
        );
    },

    // Delete account by ID
    delete(id, callback) {
        return db.query('DELETE FROM account WHERE account_id = ?', [id], callback);
    }
};

module.exports = account;
