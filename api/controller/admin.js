const express = require('express')
const _ = require('lodash')
const bson = require('bson')

const Room = require('../models/room')
const Message = require('../models/message')
const User = require('../models/user')
const config = require('../config/config')

const adminRoutes = express.Router();

adminRoutes.post('/junior/find', function(req, res) {
  	const { id, search } = req.body;
  	const regexp = new RegExp(search);

  	User
    	.find({ 'nickname': regexp,'admin': false }, {name: 1, email: 1, nickname: 1, _id: 1, admin: 1})
      	.where('_id').ne(id)
      	.limit(5)
      	.exec()
      	.then(function(juniors) {
        	res.json(juniors);
      	});
});

adminRoutes.post('/junior/set', function(req, res) {
  	const { id, state } = req.body;

  	User
	    .update({ '_id': id}, { admin: state })
	    .exec()
	    .then(function(user) {
	    	res.json(user);
	    });
});

adminRoutes.post('/junior/list', function(req, res) {
  	User
	    .find({ admin: true })
	    .exec()
	    .then(function(juniors) {
	    	res.json(juniors);
	    });
});

module.exports = adminRoutes;