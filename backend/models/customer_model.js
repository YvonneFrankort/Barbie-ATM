const db=require('../database.js');

const customer = {
    getAll(callback){
        return db.query('SELECT * FROM customer', callback);
    },
    getById(id, callback){
        return db.query('SELECT * FROM customer WHERE customer_id = ?', [id], callback);
    },
    add(newCustomer, callback){
        return db.query('INSERT INTO customer (firstname, secondname) VALUES (?, ?)', 
            [newCustomer.firstname, newCustomer.secondname], callback);
    },
    update(id, newData, callback){
        return db.query('UPDATE customer SET firstname = ?, secondname = ? WHERE customer_id = ?',
            [newData.firstname, newData.secondname, id], callback);
    },
    delete(id, callback){
        return db.query('DELETE FROM customer WHERE customer_id = ?', 
            [id], callback); 
    }
}

module.exports = customer;