const db = require('../database.js');

//get all customers
const customer = {
    getAll(callback) {
        return db.query('SELECT * FROM customer', callback);
    },

//get customer by id
    getById(id, callback) {
        return db.query('SELECT * FROM customer WHERE customer_id = ?', [id], callback);
    },

//get customer name
    getName(id, callback) {
        return db.query(
            `SELECT CONCAT(firstname, ' ', secondname) AS Owner 
             FROM customer 
             JOIN card ON card.customer_id = customer.customer_id 
             WHERE customer.customer_id = ?;`, [id], callback);
        },

//add a new customer
    add(newCustomer, callback) {
        return db.query(
            'INSERT INTO customer (firstname, secondname) VALUES (?, ?)',
            [newCustomer.firstname, newCustomer.secondname], 
            callback
        );
    },

    //update customer by id
    update(id, updatedCustomer, callback) {
        return db.query(
            'UPDATE customer SET firstname = ?, secondname = ? WHERE customer_id = ?',
            [updatedCustomer.firstname, updatedCustomer.secondname, id], callback);
        },

    //delete a customer by id
    delete(id, callback) {
        return db.query('DELETE FROM customer WHERE customer_id = ?', [id], callback);
    }
};

module.exports = customer;
