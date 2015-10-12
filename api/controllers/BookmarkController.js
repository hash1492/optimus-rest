/**
 * BookmarkController
 *
 * @description :: Server-side logic for managing bookmarks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req,res){
		var bookmark = req.body;

		Bookmark.create(bookmark)
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
			res.serverError(err)
		})
	}

};
