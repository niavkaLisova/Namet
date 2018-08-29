const express = require('express')
const _ = require('lodash')
const fs = require('fs')
const bson = require('bson')

const Comment = require('../models/comment')
const User = require('../models/user')
const config = require('../config/config')
const { ObjectId } = require('mongodb')
 
const commentRoutes = express.Router();

var throwFailed = function (res, message) {
  return res.json({ success: false, message: message });
}

commentRoutes.post('/send', function(req, res) {
  const { author, text, idRecord, answerer } = req.body;

  const newComment = new Comment({
    author,
    text,
    idRecord,
    answerer
  })

  newComment.save(function(err, docs) {
    res.json(docs);
  });
});

commentRoutes.post('/find/by/id', function(req, res) {
  const { idRecord } = req.body;

  Comment
    .find({idRecord})
    .sort({createdAt: '-1'})
    .exec()
    .then(function(comments) {
      res.json({success: true, doc: comments});
    });
});

commentRoutes.post('/clear', function(req, res) {
  const { idComment } = req.body;

  Comment.remove({'_id': idComment}, (err) => {
    if(err) throw err;
    res.json({ success: true, message: 'comment clear' });
  });
});

module.exports = commentRoutes;
