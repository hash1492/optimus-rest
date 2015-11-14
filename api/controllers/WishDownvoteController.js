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

	// If wish is not downvoted, create a downvote. If wish is downvoted, delete the downvote
	toggleWishDownvote: function(req, res) {
		var wish_downvote = {};

		wish_downvote.wish_id = req.param("wish_id");
		wish_downvote.user_id = req.test_session.user_id;

		console.log(wish_downvote);
		WishUpvote.findOne(wish_downvote)
		.then(function(response) {
			console.log(response);
			// If wish is upvoted by this user, then remove the upvote
			if(response){
				WishDownvote.destroy(wish_downvote)
				.then(function(response) {
					// console.log(response);
					module.exports.getWishDownvoteCount(wish_downvote.wish_id, function(err, downvote_count) {
						if(err){
							res.serverError(err)
						}
						res.send(downvote_count);
					})
				})
				.fail(function(err) {
					console.log(err);
					res.serverError(err);
				})
			}
			// If wish is not upvoted by this user, then upvote it
			else{
				WishDownvote.create(wish_downvote)
				.then(function(response) {
					module.exports.getWishDownvoteCount(wish_downvote.wish_id, function(err, downvote_count) {
						if(err){
							res.serverError(err)
						}
						res.send(downvote_count);
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
