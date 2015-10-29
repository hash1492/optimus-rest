/**
* Session.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require("node-uuid");

module.exports = {
  adapter: 'mongolab',
  tableName: 'sessions',
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
    token: {
      type:'string',
      required: true
    }
  },
  beforeCreate: function (values, cb) {
    values.id = uuid.v4();
    cb();
  }
};
