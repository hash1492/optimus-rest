/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req,res){
		var comment = req.body;
		comment.user = {
			id: req.test_session.id,
			name: req.test_session.name
		};

		console.log(comment);
		Comment.create(comment)
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
			res.serverError(err);
		});
	},

	getAll: function(req,res){
		var wish_id = req.param("wish_id");

		Comment.find({wish_id:wish_id})
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
			res.serverError(err);
		});
	}



};
