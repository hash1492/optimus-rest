/**
* Wish.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  adapter: 'mongolab',
  tableName: 'wishes',
  attributes: {
    id: {
      type:'string',
      required: true,
      unique: true
    },
    name: {
      type:'string',
      required: true
    },
    short_description: {
      type:'string',
      required: true
    },
    long_description: {
      type:'string',
      required: true
    },
    up_votes: {
      type:'number',
      required: true
    },
    down_votes: {
      type:'number',
      required: true
    },
    similar_apps: {
      type:'json',
      required: false
    },
    platforms: {
      type:'json',
      required: false
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
