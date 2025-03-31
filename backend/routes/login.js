const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const card = require('../models/card_model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const database = require('../database.js');

dotenv.config();

router.post('/', 
  function(request, response) {
    if(request.body.rfid_code && request.body.pin_code){
      const user = request.body.rfid_code;
      const pass = request.body.pin_code;
      
        card.checkPin(user, function(dbError, dbResult) {
          if(dbError){
            response.send("db_error");
          }
          else {
            if (dbResult.length > 0) {
              bcrypt.compare(pass,dbResult[0].pin_code, function(err,compareResult) {
                if(compareResult) {
                  console.log("success");

                  // Fetch the account_id related to the card
                  database.query(
                    `SELECT cardaccount.account_id FROM cardaccount
                    JOIN card ON cardaccount.card_id = card.card_id
                    WHERE card.rfid_code = ?`, [user],
                    function(error, result) {
                      if (error) {
                        console.log("Error fetching account_id: ");
                        response.send("db_error");
                      }
                      else if (result.length > 0) {
                        const account_id = result[0].account_id;
                        // Generate a token with rfid and account_id
                        const token = generateAccessToken({ rfid_code: user, account_id: account_id });
                        response.setHeader('Content-Type', 'application/json');
                        response.send(token);
                      } 
                      else 
                      {
                        console.log("No account found for this card.");
                        response.send(false);
                      }
                    }
                  );
                }
                else 
                {
                  console.log("wrong pin");
                  response.send(false);
                }
              });
                /*

                  const token = generateAccessToken({ rfid_code: user });
                  response.setHeader('Content-Type', 'application/json'); 
                  response.send(token);
                }
                else {
                    console.log("wrong pin");
                    response.send(false);
                }			
              }
              );*/
            }
            else {
              console.log("card does not exists");
              response.send(false);
            }
          }
          }
        );
      }
    else {
      console.log("card or pin missing");
      response.send(false);
    }
  }
);

function generateAccessToken(data) {
  // dotenv.config();
  return jwt.sign(data, process.env.MY_TOKEN, { expiresIn: '1800s' });
}

module.exports=router;