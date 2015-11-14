/**
 * WishUpvoteController
 *
 * @description :: Server-side logic for managing wishupvotes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	// Get the count of wish upvotes
	getWishUpvoteCount: function(wish_id, callback) {
		WishUpvote.count({wish_id:wish_id})
		.then(function(wish_upvote_count) {
			console.log(wish_upvote_count);
			callback(false, {upvote_count: wish_upvote_count});
		})
		.fail(function(err) {
			console.log(err);
			callback(err, false);
		})
	},


	// If wish is not upvoted, create an upvote. If wish is upvoted, delete the upvote
	toggleWishUpvote: function(req, res) {

		var wish_upvote = {};

		var wish_upvotes = req.param("wish_upvotes");
		wish_upvote.wish_id = req.param("wish_id");
		wish_upvote.user_id = req.test_session.user_id;

		console.log(wish_upvote);
		WishUpvote.findOne(wish_upvote)
		.then(function(response) {
			console.log(response);
			// If wish is upvoted by this user, then remove the upvote
			if(response){
				WishUpvote.destroy(wish_upvote)
				.then(function(response) {
					Wish.update({id: wish_upvote.wish_id},{upvotes: wish_upvotes - 1})
					.then(function(response) {
						console.log(response);
						res.send(response[0]);
					})
					.fail(function(err) {
						console.log(err);
						res.serverError(err);
					})
				})
				.fail(function(err) {
					console.log(err);
					res.serverError(err);
				})
			}
			// If wish is not upvoted by this user, then upvote it
			else{
				WishUpvote.create(wish_upvote)
				.then(function(response) {
					Wish.update({id: wish_upvote.wish_id},{upvotes: wish_upvotes + 1})
					.then(function(response) {
						console.log(response);
						res.send(response[0]);
					})
					.fail(function(err) {
						console.log(err);
						res.serverError(err);
					})
				})
				.fail(function(err) {
					console.log(err);
					res.serverError(err);
				})
			}
		})
		.fail(function(err) {
			console.log(err);
			res.serverError(err);
		})
	}

};
