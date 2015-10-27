/**
 * WishDownvoteController
 *
 * @description :: Server-side logic for managing wishdownvotes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	toggleWishDownvote: function(req, res) {
		var wish_downvote = req.body;
		console.log(wish_downvote);
		WishUpvote.findOne(wish_downvote)
		.then(function(response) {
			console.log(response);
			// If wish is upvoted by this user, then remove the upvote
			if(response){
				WishDownvote.destroy(wish_downvote)
				.then(function(response) {
					console.log(response);
					res.send(response);
				})
				.fail(function(err) {
					console.log(err);
				})
			}
			// If wish is not upvoted by this user, then upvote it
			else{
				WishDownvote.create(wish_downvote)
				.then(function(response) {
					console.log(response);
					res.send(response);
				})
				.fail(function(err) {
					console.log(err);
				})
			}
		})
		.fail(function(err) {
			console.log(err);
		})
	}



};
