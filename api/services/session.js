/**
 * session
 *
 * @description :: Custom Session Service
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */


// Creates a session
module.exports.create = function(session, callback) {
  // console.log("Creates a session");
  Session.create(session)
  .then(function(response) {
    // console.log(response);
    callback(true);
  })
  .fail(function(err) {
    console.log(err);
    callback(false);
  })
};

// Deletes a session
module.exports.destroy = function(session, callback) {
  Session.destroy(session)
  .then(function(response) {
    // console.log(response);
    callback(false,response)
  })
  .fail(function(err) {
    console.log(err);
    callback(err,false);
  })
};


// Get session by user_id
module.exports.get = function(session, callback) {
  // console.log("get a session");
  Session.findOne({user_id: session.user_id})
  .then(function(response) {
    // console.log(response);
    if(response){
      callback(false,response);
    }
    else{
      callback(true,false);
    }
  })
  .fail(function(err) {
    console.log(err);
    callback(err,false);
  })
};
