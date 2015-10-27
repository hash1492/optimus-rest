/**
 * WishUpvoteController
 *
 * @description :: Server-side logic for managing wishupvotes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	toggleWishUpvote: function(req, res) {
		var wish_upvote = req.body;
		console.log(wish_upvote);
		WishUpvote.findOne(wish_upvote)
		.then(function(response) {
			console.log(response);
			// If wish is upvoted by this user, then remove the upvote
			if(response){
				WishUpvote.destroy(wish_upvote)
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
				WishUpvote.create(wish_upvote)
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
