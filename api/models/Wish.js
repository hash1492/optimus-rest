/**
* Wish.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require("node-uuid");

module.exports = {
  adapter: 'mongolab',
  tableName: 'wishes',
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
    category: {
      type:'json',
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
  },
  beforeCreate: function (values, cb) {
    values.id = uuid.v4();
    cb();
  }
};
