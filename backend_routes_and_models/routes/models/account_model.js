const db = require('../database.js');

const account={

//get all accounts
    getAll(callback) {
        return db.query('SELECT * FROM account', callback);
    },

//get account by id
    getById(id, callback) {
        return db.query('SELECT * FROM account WHERE account_id = ?', [id], callback);
    },

//add a new account
    add(newAccount, callback) {
        return db.query(
            'INSERT INTO customer (firstname, secondname) VALUES (?, ?)',
            [newCustomer.firstname, newCustomer.secondname], 
            callback
        );
},

//get account by customer id
getByCustomerId(customerId, callback) {
    return db.query('SELECT * FROM account WHERE customer_id = ?', [customer_id], callback);
},

//add a new account
add(newAccount, callback) {
    return db.query(
        'INSERT INTO account (customer_id, balance, account_type, credit_limit) VALUES (?, ?, ?, ?)',
        [newAccount.customer_id, newAccount.balance, newAccount.account_type, newAccount.credit_limit], 
        callback
    );
},

//update account by id
update(id, updatedAccount, callback) {
   return db.query(
        'UPDATE account SET balance = ?, account_type = ?, credit_limit = ? WHERE account_id = ?',
        [updatedAccount.balance, updatedAccount.account_type, updatedAccount.credit_limit, id], 
        callback
    );
},

//delete account by id
delete(id, callback) {
   return db.query('DELETE FROM account WHERE account_id = ?', [id], callback);
}
};

module.exports = account;