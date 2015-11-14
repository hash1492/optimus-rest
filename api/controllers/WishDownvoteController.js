/**
 * WishDownvoteController
 *
 * @description :: Server-side logic for managing wishdownvotes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	// Get the count of wish downvotes
	getWishDownvoteCount: function(wish_id, callback) {
		WishDownvote.count({wish_id:wish_id})
		.then(function(wish_downvote_count) {
			console.log(wish_downvote_count);
			callback(false, {downvote_count: wish_downvote_count});
		})
		.fail(function(err) {
			console.log(err);
			callback(err, false);
		})
	},

	// If wish is not downvoted, create an downvote. If wish is downvoted, delete the downvote
	toggleWishDownvote: function(req, res) {

		var wish_downvote = {};

		var wish_downvotes = req.param("wish_downvotes");
		wish_downvote.wish_id = req.param("wish_id");
		wish_downvote.user_id = req.test_session.user_id;

		console.log(wish_downvote);
		WishDownvote.findOne(wish_downvote)
		.then(function(response) {
			console.log(response);
			// If wish is downvoted by this user, then remove the downvote
			if(response){
				WishDownvote.destroy(wish_downvote)
				.then(function(response) {
					Wish.update({id: wish_downvote.wish_id},{downvotes: wish_downvotes - 1})
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
			// If wish is not downvoted by this user, then downvote it
			else{
				WishDownvote.create(wish_downvote)
				.then(function(response) {
					Wish.update({id: wish_downvote.wish_id},{downvotes: wish_downvotes + 1})
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
