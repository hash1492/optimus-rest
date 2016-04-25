/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require("bcrypt");

module.exports = {

	register: function(req,res) {
		var user = req.body;

		User.create(user)
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
			res.serverError(err);
		});
	},

	login: function(req,res) {
		var user = req.body;
		console.log(user);
		User.findOne({email: user.email})
		.then(function(response) {
			console.log(response);
			if(response){
				bcrypt.compare(user.password, response.password, function(err, passwords_match) {
						if(passwords_match){
							// Create token payload
							var token_payload = {};
							token_payload.id = response.id;
							token_payload.email = response.email;
							token_payload.name = response.name;

							// Issue token and send it in response
							var token = jwt.issue(token_payload);
							response.token = token;
							delete response.password;

							res.send(response);
						}
						else{
							res.serverError("INCORRECT_PASSWORD");
						}
				});
			}
			else{
				res.serverError("INCORRECT_EMAIL");
			}
		})
		.fail(function(err) {
			console.log(err);
			res.serverError(err);
		});
	},

};
