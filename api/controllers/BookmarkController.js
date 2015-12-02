/**
 * BookmarkController
 *
 * @description :: Server-side logic for managing bookmarks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	toggleWishBookmark: function(req, res) {
		var bookmark = {};

		bookmark.wish_id = req.param("wish_id");
		bookmark.user_id = req.test_session.user_id;


		console.log(bookmark);
		Bookmark.findOne(bookmark)
		.then(function(response) {
			console.log(response);
			// If wish is upvoted by this user, then remove the upvote
			if(response){
				Bookmark.destroy(bookmark)
				.then(function(response) {
					console.log(response);
					res.send(response);
				})
				.fail(function(err) {
					console.log(err);
					res.serverError(err);
				})
			}
			// If wish is not upvoted by this user, then upvote it
			else{
				Bookmark.create(bookmark)
				.then(function(response) {
					console.log(response);
					res.send(response);
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
	},


	getAll: function(req, res) {
		var user_id = req.test_session.user_id;

		Bookmark.find({user_id: user_id})
		.then(function(bookmarks) {
			console.log(bookmarks);
			if(!bookmarks){
				res.send([]);
				return;
			}
			var counter = 0;
			var wishes = [];
			bookmarks.forEach(function(bookmark) {
				Wish.findOne({id: bookmark.wish_id})
				.then(function(wish) {
					console.log(wish);

					// Determine if wish is upvote/downvoted and bookmarked
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

						WishDownvote.findOne({user_id: user_id, wish_id:wish.id})
						.then(function(wish_downvote) {
							if(wish_downvote){
								wish.is_downvoted = true;
							}
							else{
								wish.is_downvoted = false;
							}

							wish.is_bookmarked = true;

							wishes.push(wish);
							counter++;

							res.send(wishes);

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
	}


};
