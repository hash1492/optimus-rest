/**
* Bookmark.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
  adapter: 'mongolab',
  tableName: 'bookmarks',
  attributes: {
    id: {
      type:'string',
      required: true,
      unique: true
    },
    user_id: {
      type:'string',
      required: true
    },
    wish_id: {
      type:'string',
      required: true
    },
    created_at: {
      type: 'datetime',
      required:true,
      defaultsTo: function() {return new Date();}
    },
    updated_at: {
      type: 'datetime',
      required:true,
      defaultsTo: function() {return new Date();}
    }
  },
  beforeCreate: function (values, cb) {
    values.id = uuid.v4();
    cb();
  },
  beforeUpdate: function (values, cb) {
    values.updated = new Date();
    cb();
  }
};
