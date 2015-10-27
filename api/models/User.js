/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var uuid = require("node-uuid");
var bcrypt = require("bcrypt");

module.exports = {
  adapter: 'mongolab',
  tableName: 'users',
  schema: true,
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
    email: {
      type:'string',
      required: true
    },
    password: {
      type:'string',
      required: true
    }
  },
  beforeCreate: function (values, cb) {
    values.id = uuid.v4();
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) {
        console.log(err);
        return cb(err);
      }
      values.password = hash;
      //console.log(hash);
      cb();
    });
  },
  beforeUpdate: function (values, cb) {
    cb();
  }
};
