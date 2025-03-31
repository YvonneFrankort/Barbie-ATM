const db = require('../database.js');

const deposit = {
    // Add a new deposit
    addDeposit(account_id, amount, callback){
        return db.query(
            'UPDATE account SET balance = balance + ? WHERE account_id = ?',
            [amount, account_id], callback
        );
    }
}

module.exports = deposit;