const db = require('../database.js');

const deposit = {
    // Add a new deposit
    addDeposit(rfid_code, amount, callback) {
        return db.query(
            'UPDATE account SET balance = balance + ? WHERE account_id = (SELECT ca.account_id FROM card c JOIN cardaccount ca ON c.card_id = ca.card_id WHERE c.rfid_code = ?)',
            [amount, rfid_code], callback
        );
    }
}

module.exports = deposit;