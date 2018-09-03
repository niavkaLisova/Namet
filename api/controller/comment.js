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
    .find({idRecord, answerer: null})
    .sort({createdAt: '-1'})
    .exec()
    .then(function(comments) {
      res.json({success: true, doc: comments});
    });
});

commentRoutes.post('/find/answer/by/id', function(req, res) {
  const { idComment } = req.body;

  Comment
    .find({answerer: idComment})
    .sort({createdAt: '-1'})
    .exec()
    .then(function(comments) {
      res.json({success: true, doc: comments});
    });
});

commentRoutes.post('/clear', function(req, res) {
  const { comment } = req.body;

  if (typeof(comment) == 'string') {
    Comment
      .remove({ '_id': comment })
      .exec()
      .then(function(result) {
        res.json({ success: true, doc: result })
      })
  } else {
    Comment
      .remove({ '$or': [ 
        { answerer: comment._id },
        { '_id': comment._id }
      ]})
      .exec()
      .then(function(comments) {
        res.json({ success:true, doc: comments })
      })
    }
});

module.exports = commentRoutes;
