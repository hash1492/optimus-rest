/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  // User
  'post /user/login' : 'UserController.login',
  'post /user/register' : 'UserController.register',
  'get /user/logout' : 'UserController.logout',

  // Wish
  'post /wish/create': 'WishController.create',
  'post /wish/update': 'WishController.update',
  'get /wish/getAll': 'WishController.getAll',
  'get /wish/getById/:wish_id': 'WishController.getById',
  'post /wish/update': 'WishController.update',

  // Category
  'get /category/getAll': 'CategoryController.getAll',

  // Comment
  'get /comment/getAll/:wish_id': 'CommentController.getAll',

  // Upvote
  'get /upvote/toggleWishUpvote/:wish_id/:wish_upvotes': 'WishUpvoteController.toggleWishUpvote',

  // Downvote
  'get /downvote/toggleWishDownvote/:wish_id/:wish_downvotes': 'WishDownvoteController.toggleWishDownvote',

  // Bookmark
  'get /bookmark/toggleWishBookmark/:wish_id': 'BookmarkController.toggleWishBookmark',



  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
