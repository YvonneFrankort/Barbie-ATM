const db = require('../database.js');

const withdraw = {
    // Add a new withdraw
    addWithdraw(rfid_code, amount, callback) {
        return db.query(
            `UPDATE account set balance = balance - ?
            WHERE account_id = (SELECT cardaccount.account_id FROM cardaccount
            JOIN card on card.card_id = cardaccount.card_id
            WHERE card.rfid_code = ?);`,
            [amount, rfid_code], callback
        );
    }
}

module.exports = withdraw;