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
			res.serverError(err)
		})
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
							var token = jwt.issue(response);
							response.token = token;
							var session_obj = {};
							session_obj.user_id = response.id;
							session_obj.token = token;
							session.create(session_obj,function(session_response) {
								if(session_response){
									res.send(response);
								}
								else{
									res.serverError("Error creating session");
								}
							})

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
		})
	},

	logout: function(req,res) {

		var obj = jwt.verify(req.headers.authorization);
		console.log(obj);
		session.destroy({user_id: obj.id},function(err, response) {
			if(err){
				console.log(err);
				return;
			}
			console.log(response);
			res.send(response);
		})
	}
};
