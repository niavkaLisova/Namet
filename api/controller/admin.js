const express = require('express')
const _ = require('lodash')
const bson = require('bson')

const Room = require('../models/room')
const Message = require('../models/message')
const User = require('../models/user')
const BlackList = require('../models/blackList')
const config = require('../config/config')

const adminRoutes = express.Router();

adminRoutes.post('/junior/find', function(req, res) {
  	const { id, search } = req.body;
  	const regexp = new RegExp(search);

  	User
    	.find({ 'nickname': regexp,'admin': false }, {name: 1, email: 1, nickname: 1, _id: 1, admin: 1})
      	.where('_id').ne(id)
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

adminRoutes.post('/banned/find', function(req, res) {
    const { id, search } = req.body;
    const regexp = new RegExp(search);

    User
      .find({ 'nickname': regexp,'admin': false, banned: '' }, {name: 1, email: 1, nickname: 1, _id: 1, admin: 1})
        .where('_id').ne(id)
        .where('email').ne('admino')
        .exec()
        .then(function(users) {
          res.json(users);
        });
});

adminRoutes.post('/banned/set', function(req, res) {
    const { id, state } = req.body;

    User
      .update({ '_id': id}, { banned: state })
      .exec()
      .then(function(user) {
        res.json(user);
      });
});

adminRoutes.post('/banned/list', function(req, res) {
    User
      .find()
      .where('banned').ne('')
      .exec()
      .then(function(juniors) {
        res.json(juniors);
      });
});

adminRoutes.post('/delete/user/find', function(req, res) {
    const { id, search } = req.body;
    const regexp = new RegExp(search);

    User
      .find({ 'nickname': regexp,'admin': false }, {name: 1, email: 1, nickname: 1, _id: 1, admin: 1})
        .where('_id').ne(id)
        .where('email').ne('admino')
        .exec()
        .then(function(users) {
          res.json(users);
        });
});

adminRoutes.post('/delete/user/set', function(req, res) {
    const { id, email } = req.body;

    User
      .findOne({ '_id': id})
      .exec()
      .then(function(user) {
        user.remove();

        let list = new BlackList({
          email
        })

        list.save(function(err, docs) {
          console.log('del', user);
          console.log('list', docs);

          res.json(user);
        })
      });
});

adminRoutes.post('/black/list', function(req, res) {
    BlackList
      .find()
      .exec()
      .then(function(users) {
        res.json(users);
      });
});

module.exports = adminRoutes;