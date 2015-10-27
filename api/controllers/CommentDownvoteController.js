/**
 * CommentDownvoteController
 *
 * @description :: Server-side logic for managing commentdownvotes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req,res) {
		var comment_downvote = req.body;
		console.log(comment_downvote);
		CommentDownvote.create(comment_downvote)
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
		})
	},

	delete: function(req,res) {
		var comment_downvote = req.body;

		CommentDownvote.destroy(comment_downvote)
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
		})
	}

};
