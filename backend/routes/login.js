const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const card = require('../models/card_model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

router.post('/', 
  function(request, response) {
    if(request.body.rfid_code && request.body.pin_code){
      const user = request.body.rfid_code;
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
                  const token = generateAccessToken({ rfid_code: user });
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

function generateAccessToken(rfid_code) {
  dotenv.config();
  return jwt.sign(rfid_code, process.env.MY_TOKEN, { expiresIn: '1800s' });
}

module.exports=router;