const db = require('../database.js');

const card ={
//get all cards
    getAll(callback){
        return db.query('SELECT * FROM card', callback);
    },

//get a card by id
getById(cardId, callback){
    return db.query('SELECT * FROM card WHERE card_id = ?', [cardId], callback);
},

//add a new card
add(newCard, callback){
    return db.query('INSERT INTO card (pin_code) VALUES (?)',
    [newCard.pin_code], callback);
},

//update card pin
update(cardId, updatedCard, callback) {
    return db.query(
        'UPDATE card SET pin_code = ? WHERE card_id = ?',
        [updatedCard.pin_code, cardId], callback);
},

//delete a card
delete(cardId, callback) {
    return db.query('DELETE FROM card WHERE card_id = ?', [cardId], callback);
}
};

module.exports = card;