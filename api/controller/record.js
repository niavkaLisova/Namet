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

recordRoutes.post('/find/records/collId/guest', function(req, res) {
  const { id } = req.body;

  Record
    .find({ section: id, state: 'public' })
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

recordRoutes.post('/find/records/top/guest', function(req, res) {
  const { author } = req.body;

  Record
    .find({ author, state: 'public' })
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

recordRoutes.post('/find/collection/by/collid', function(req, res) {
  const { id, myId } = req.body;
  if (id) {
    Sections
      .findOne({ _id: id, userId: myId })
      .exec()
      .then(function(collection) {
        res.json(collection);
      });
  } else {
    res.json('empty')
  }
});

recordRoutes.post('/record/update', function(req, res) {
  const { record } = req.body;
  
  Sections
    .update({ _id: record._id }, { 
      title: record.title,
      describe: record.describe
    }, function (err, doc) {
      if (err) throw err;

      res.json(doc)
    });
});

recordRoutes.post('/remove/section/id', function(req, res) {
  const { sectionId } = req.body;

  Sections
    .remove({ _id: sectionId })
    .exec()
    .then(function(result) {
      res.json(result);
    });
});

recordRoutes.post('/find/collections/none', function(req, res) {
  const { myId } = req.body;

  Record
    .find(
      { '$or': [ 
        { author: myId, section: '' },
        { author: myId, section: null }
     ]})
    .exec()
    .then(function(records) {
      res.json(records);
    });
});

recordRoutes.post('/find/collections/none/guest', function(req, res) {
  const { myId } = req.body;

  Record
    .find(
      { '$or': [ 
        { author: myId, section: '', state: 'public' },
        { author: myId, section: null, state: 'public' }
     ]})
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

recordRoutes.post('/search/guest', function(req, res) {
  const { search, author } = req.body;
  const regexp = new RegExp(search);

  Record
    .find({ author, title: regexp, state: 'public' })
    .exec()
    .then(function(records) {
      res.json(records);
    });
});

recordRoutes.post('/set/review', function(req, res) {
  const { recordId } = req.body;

  Record
    .findOne({ _id: recordId })
    .exec()
    .then(function(record) {
      record.review = String(Number(record.review) + 1);
      record.save(function(err, doc) {
        if (err) throw err;
        return res.json({ success: true, message: 'successfully.', doc });
      });

    });
});

recordRoutes.post('/full/id', function(req, res) {
  const { recordId } = req.body;

  Record
    .findOne({ _id: recordId })
    .exec()
    .then(function(record) {
      res.json(record);
    });
});

recordRoutes.post('/remove/record/id', function(req, res) {
  const { recordId } = req.body;

  Record
    .remove({ _id: recordId })
    .exec()
    .then(function(record) {
      res.json(record);
    });
});

module.exports = recordRoutes;
