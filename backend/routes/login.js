const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const card = require('../models/card_model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

router.post('/', 
  function(request, response) {
    if(request.body.card_id && request.body.pin_code){
      const user = request.body.card_id;
      const pass = request.body.pin_code;
      
        card.checkPin(user, function(dbError, dbResult) {
          if(dbError){
            response.json(dbError);
          }
          else{
            if (dbResult.length > 0) {
              bcrypt.compare(pass,dbResult[0].pin_code, function(err,compareResult) {
                if(compareResult) {
                  console.log("success");
                  const token = generateAccessToken({ card_id: user });
                  response.setHeader('Content-Type', 'application/json'); 
                  response.send(token);
                }
                else {
                    console.log("wrong pin");
                    response.send(false);
                }			
              }
              );
            }
            else{
              console.log("card does not exists");
              response.send(false);
            }
          }
          }
        );
      }
    else{
      console.log("card or pin missing");
      response.send(false);
    }
  }
);

function generateAccessToken(card_id) {
  dotenv.config();
  return jwt.sign(card_id, process.env.MY_TOKEN, { expiresIn: '1800s' });
}

module.exports=router;