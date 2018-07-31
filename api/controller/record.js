const express = require('express')
const _ = require('lodash')
const fs = require('fs')
const bson = require('bson')

const Sections = require('../models/sections')
const Record = require('../models/record')
const config = require('../config/config')
const { ObjectId } = require('mongodb')
 
const recordRoutes = express.Router();

var throwFailed = function (res, message) {
  return res.json({ success: false, message: message });
}

recordRoutes.post('/find/records/collId', function(req, res) {
  const { id } = req.body;

  Record
      .find({ section: id })
      .exec()
      .then(function(records) {
        res.json(records);
      });
});

recordRoutes.post('/find/records/top', function(req, res) {
  const { author } = req.body;

  Record
      .find({ author })
      .sort({updatedAt: '-1'})
      .limit(3)
      .exec()
      .then(function(records) {
        res.json(records);
      });
});

recordRoutes.post('/find/collections/id', function(req, res) {
  const { id, myId } = req.body;

  Sections
      .find({ userId: id })
      .exec()
      .then(function(collections) {
        res.json(collections);
      });
});

recordRoutes.post('/find/collections/none', function(req, res) {
  const { myId } = req.body;

  Record
      .find({ author: myId, section: '' })
      .exec()
      .then(function(records) {
        res.json(records);
      });
});

recordRoutes.post('/update/record/at', function(req, res) {
  const { id } = req.body;
  let date = new Date();

  Record
      .update({ _id: id }, { updatedAt: date}, function (err, record) {
    if (err) throw err;

    res.json(record)
  });
});

recordRoutes.post('/search', function(req, res) {
  const { search, author } = req.body;
  const regexp = new RegExp(search);

  Record
      .find({ author, title: regexp })
      .exec()
      .then(function(records) {
        res.json(records);
      });
});

module.exports = recordRoutes;
