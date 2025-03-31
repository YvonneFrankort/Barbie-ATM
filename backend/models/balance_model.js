const db = require('../database.js');

const balance = {
    getBalance (id, callback){
        return db.query(
            `SELECT account.balance FROM account 
            JOIN cardaccount ON cardaccount.account_id = account.account_id
            JOIN card ON card.card_id = cardaccount.card_id
            WHERE card.rfid_code = ?;`,
        [id], callback)
}
};

module.exports = balance;