/**
 * WishController
 *
 * @description :: Server-side logic for managing wishes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getAll: function(req,res) {
		// console.log("test_session ===");
		// console.log(req.test_session);
		var user_id = req.test_session.user_id;
		console.log("user_id");
		console.log(user_id);

		Wish.find({})
		.then(function(wishes) {
			console.log("wishes");
			console.log(wishes);
			if(wishes.length === 0){
				res.send(wishes);
				return;
			}
			var counter = 0;
			wishes.forEach(function(wish) {
				WishUpvote.findOne({user_id: user_id, wish_id:wish.id})
				.then(function(wish_upvote) {
					console.log("wish_upvote");
					console.log(wish_upvote);
					if(wish_upvote){
						wish.is_upvoted = true;
					}
					else{
						wish.is_upvoted = false;
					}
					// Determine if wish is upvote/downvoted and bookmarked
					WishDownvote.findOne({user_id: user_id, wish_id:wish.id})
					.then(function(wish_downvote) {
						if(wish_downvote){
							wish.is_downvoted = true;
						}
						else{
							wish.is_downvoted = false;
						}
						Bookmark.findOne({user_id: user_id, wish_id:wish.id})
						.then(function(bookmark) {
							if(bookmark){
								wish.is_bookmarked = true;
							}
							else{
								wish.is_bookmarked = false;
							}
							counter++;
							if(counter === wishes.length){
								res.send(wishes);
							}
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
				})
				.fail(function(err) {
					console.log(err);
					res.serverError(err);
				})
			})
		})
		.fail(function(err) {
			console.log(err);
			res.serverError(err);
		})
	},

	getById: function(req,res) {
		var wish_id = req.param("wish_id");
		console.log(wish_id);
		Wish.findOne({_id: wish_id})
		.then(function(wish) {

			WishUpvote.count({wish_id:wish_id})
			.then(function(upvote_count) {
				WishDownvote.count({wish_id:wish_id})
				.then(function(downvote_count) {
					wish.upvotes = upvote_count;
					wish.downvotes = downvote_count;
					console.log(wish);
					res.send(wish);
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
		})
		.fail(function(err) {
			console.log(err);
			res.serverError(err);
		})
	},

	create: function(req,res) {
		var wish = req.body;
		wish.user_id = req.test_session.user_id;
		console.log(wish);
		Wish.create(wish)
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
			res.serverError(err);
		})
	},

	update: function(req, res) {
		var wish = req.body;

		Wish.update({id: wish.id},wish)
		.then(function(response) {
			console.log(response[0]);
			res.send(response[0]);
		})
		.fail(function(err) {
			console.log(err);
			res.serverError(err);
		})

	}

};
