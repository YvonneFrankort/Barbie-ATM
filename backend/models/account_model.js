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

    // Get account type
    checkAccountType(id, callback) {
        return db.query(`SELECT account.account_type FROM account 
            JOIN cardaccount ON cardaccount.account_id = account.account_id
            JOIN card ON card.card_id = cardaccount.card_id
            WHERE card.rfid_code = ?`, [id], callback);
    },

    // Get account_number
    getAccountNumber(id, callback) {
        return db.query (`SELECT account.account_number FROM account
            JOIN cardaccount ON cardaccount.account_id = account.account_id
            JOIN card on card.card_id = cardaccount.account_id
            WHERE card.rfid_code = ?`,[id], callback);
    },
    

    // Add a new account with proper credit limit handling
    add(newAccount, callback) {
        const { customer_id, balance, account_type, credit_limit } = newAccount;

        let finalCreditLimit = null; // Default for debit accounts
        if (account_type === "credit" || account_type === "double") {
            if (!credit_limit || credit_limit <= 0) {
                return callback(new Error("Credit and double accounts must have a valid credit limit."));
            }
            finalCreditLimit = credit_limit;
        }

        return db.query(
            'INSERT INTO account (customer_id, balance, account_type, credit_limit) VALUES (?, ?, ?, ?)',
            [customer_id, balance, account_type, finalCreditLimit],
            callback
        );
    },

    // Update account by ID with credit limit rules
    update(id, updatedAccount, callback) {
        const { balance, account_type, credit_limit } = updatedAccount;

        let finalCreditLimit = null; // Default for debit accounts
        if (account_type === "credit" || account_type === "double") {
            if (!credit_limit || credit_limit <= 0) {
                return callback(new Error("Credit and double accounts must have a valid credit limit."));
            }
            finalCreditLimit = credit_limit;
        }

        return db.query(
            'UPDATE account SET balance = ?, account_type = ?, credit_limit = ? WHERE account_id = ?',
            [balance, account_type, finalCreditLimit, id],
            callback
        );
    },

    // Delete account by ID
    delete(id, callback) {
        return db.query('DELETE FROM account WHERE account_id = ?', [id], callback);
    },

    //update balance
    updateBalance(account_id, newBalance, callback) {
        return db.query(
            'UPDATE account SET balance = ? WHERE account_id = ?',
            [newBalance, account_id],
            callback
        );
    }
};

module.exports = account;


