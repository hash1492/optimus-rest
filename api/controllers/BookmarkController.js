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
	}


};
