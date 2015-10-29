/**
 * jwt
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var
  jwt = require('jwt-simple'),
  tokenSecret = "secretissecet";

// Generates a token from supplied payload
module.exports.issue = function(payload) {

  if(payload && tokenSecret){
    var token = jwt.encode(payload,tokenSecret);
    return token;
  }
  else{
    console.log("Payload or tokenSecret is missing");
  }
};

// Verifies token on a request
module.exports.verify = function(token) {
  if(token && tokenSecret){
    try{
      var obj =  jwt.decode(token,tokenSecret);
      return obj;
    }

    catch(err){
      console.log(err)
    }
  }

};
