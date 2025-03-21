const db = require('../database.js');

const card = {
    // Get all cards
    getAll(callback) {
        return db.query('SELECT * FROM card', callback);
    },

    // Get a card by ID
    getById(cardId, callback) {
        return db.query('SELECT * FROM card WHERE card_id = ?', [cardId], callback);
    },

    // Add a new card (Including rfid_code)
    add(newCard, callback){
        return db.query('INSERT INTO card (customer_id, pin_code, rfid_code) VALUES (?, ?, ?)',
        [newCard.customer_id, newCard.pin_code, newCard.rfid_code], callback);
    },
    
    
    // Update card details (Including rfid_code)
    update(cardId, updatedCard, callback) {
        if (!updatedCard.pin_code || !updatedCard.rfid_code) {
            return callback({ message: "pin_code and rfid_code are required" }, null);
        }

        return db.query(
            'UPDATE card SET pin_code = ?, rfid_code = ? WHERE card_id = ?',
            [updatedCard.pin_code, updatedCard.rfid_code, cardId], 
            callback
        );
    },

    // Delete a card 
    delete(cardId, callback) {
        return db.query('DELETE FROM card WHERE card_id = ?', [cardId], (err, result) => {
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    return callback({ message: "Cannot delete: card is linked to transactions" }, null);
                }
                return callback(err, null);
            }
            callback(null, result);
        });
    }
};

module.exports = card;
