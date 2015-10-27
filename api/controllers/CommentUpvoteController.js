/**
 * CommentUpvoteController
 *
 * @description :: Server-side logic for managing commentupvotes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req,res) {
		var comment_upvote = req.body;
		console.log(comment_upvote);
		CommentUpvote.create(comment_upvote)
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
		})
	},

	delete: function(req,res) {
		var comment_upvote = req.body;

		CommentUpvote.destroy(comment_upvote)
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
		})
	}

};
