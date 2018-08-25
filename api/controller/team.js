const express = require('express')
const _ = require('lodash')
const fs = require('fs')
const bson = require('bson')

const Record = require('../models/record')
const User = require('../models/user')
const Team = require('../models/team')
const config = require('../config/config')
const { ObjectId } = require('mongodb')
 
const teamRoutes = express.Router();

var throwFailed = function (res, message) {
  return res.json({ success: false, message: message });
}

teamRoutes.post('/find/recently/idTeam', function(req, res) {
  const { idTeam } = req.body;

  User
    .find({team: idTeam}, {_id: 1})
    .exec()
    .then(function(users) {
      let result = users.map(user => user._id)
      
      Record
        .find({
          type: { $elemMatch: {$in: ["work"]}},
          state: "public",
          author: {$in: result}
        })
        .sort({ 'createdAt': -1 })
        .exec()
        .then(function(record) {
          res.json(record);
        });
    })
});

teamRoutes.post('/find/info/idTeam', function(req, res) {
  const { idTeam } = req.body;

  Team
    .findById(idTeam)
    .exec()
    .then(function(info) {
      res.json(info);
    })
});

teamRoutes.post('/find/admin/idTeam', function(req, res) {
  const { idTeam } = req.body;

  User
    .find({team: idTeam, admin: true})
    .exec()
    .then(function(users) {
      res.json(users);
    })
});

module.exports = teamRoutes;
