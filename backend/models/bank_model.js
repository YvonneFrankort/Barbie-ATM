const db = require('../database.js');

const customer = {
    getAll(callback) {
        return db.query('SELECT * FROM customer', callback);
    },

    getById(id, callback) {
        return db.query('SELECT * FROM customer WHERE customer_id = ?', [id], callback);
    },

    add(newCustomer, callback) {
        return db.query('INSERT INTO customer (phone, ssn, name) VALUES (?, ?, ?)', 
        [newCustomer.phone, newCustomer.ssn, newCustomer.name], callback);
    }
};

module.exports = customer;
