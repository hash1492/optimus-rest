/**
 * WishController
 *
 * @description :: Server-side logic for managing wishes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getAll: function(req,res) {

		Wish.find({})
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
		})
	},

	getById: function(req,res) {
		var wish_id = req.param("wish_id");
		console.log(wish_id);
		Wish.findOne({_id: wish_id})
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
		})
	},

	create: function(req,res) {
		var wish = req.body;
		console.log(wish);
		Wish.create(wish)
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.fail(function(err) {
			console.log(err);
		})
	},

	upvoteDownvote: function(req,res) {
		var wish_id = req.param('wish_id');

		var upvote_downvote = req.param('upvote_downvote');

		if(upvote_downvote === "upvote"){
			var update_obj = {upvotes: upvotes + 1}
		}
		if(upvote_downvote === "downvote"){
			var update_obj = {downvotes: downvotes + 1}
		}

		Wish.update(wish_id, update_obj)
		.then(function(response) {
			console.log(response[0]);
			res.send(response[0]);
		})
		.fail(function(err) {
			console.log(err);
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
		})

	}

};
