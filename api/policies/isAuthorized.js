/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  var token = "";

  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization;

    var user = jwt.verify(token);

    if(user){
      var session_obj = {};
      session_obj.user_id = user.id;
      session.get(session_obj, function(err, session_response) {
        if(err){
          res.forbidden("Session doesn't exist");
        }
        // console.log(session_response);
        // Set the current session
        req.test_session = session_response;
        next();
      });
    }


  } else {
    return res.json(401, {err: 'No Authorization header was found'});
  }


};
