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

    // If the user is valid, add its obj to the request session
    if(user){
      console.log(user);
      req.test_session = user;
      next();
    }


  } else {
    return res.json(401, {err: 'No Authorization header was found'});
  }


};
