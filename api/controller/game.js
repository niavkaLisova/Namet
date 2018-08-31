const express = require('express')
const _ = require('lodash')
const fs = require('fs')
const bson = require('bson')

const Game = require('../models/game')
const User = require('../models/user')
const Record = require('../models/record')
const Vote = require('../models/vote')
const config = require('../config/config')
const { ObjectId } = require('mongodb')
 
const gameRoutes = express.Router();

var throwFailed = function (res, message) {
  return res.json({ success: false, message: message });
}

gameRoutes.post('/create', function(req, res) {
  const { author, thema } = req.body;

  const newGame = new Game({
    author,
    thema,
    status: 'active'
  })

  newGame.save(function(err, docs) {
    res.json(docs);
  });
});

gameRoutes.post('/find/game/by/author', function(req, res) {
  const { author } = req.body;

  Game
    .find({ author })
    .exec()
    .then(function(games) {
      res.json({success: true, doc: games});
    });
});

gameRoutes.get('/find/game/all', function(req, res) {
  Game
    .find()
    .sort({createdAt: '-1'})
    .exec()
    .then(function(games) {
      res.json({success: true, doc: games});
    });
});

gameRoutes.post('/find/record/search', function(req, res) {
  const { author, search } = req.body;
  const regexp = new RegExp(search);
  
  Record
    .find({ '$and': [ 
        { author },
        { title: regexp }
     ]})
    .sort({createdAt: '-1'})
    .exec()
    .then(function(records) {
      res.json({success: true, doc: records});
    });
});

gameRoutes.post('/join/record', function(req, res) {
  const { author, idRecord, idGame } = req.body;

  Game
    .findById(idGame)
    .exec()
    .then(function(games) {
      let result = false;
      
      if (games.players.length > 0) {
        const keys = Object.keys(games.players[0]);
        result = keys.includes(author);
      }
      
      if (result) {
        return throwFailed(res, 'You have already joined')
      } else{
        let newPlayers = Object.assign({}, games.players[0]);
        newPlayers[author] = idRecord;
        games.players = newPlayers;
 
        games.save((err, game) => {
          if (err) console.log(err);

          res.json({ success: true, doc: game })
        })
      }
    });
});

gameRoutes.post('/vote/record', function(req, res) {
  const { idUser, idGame, idRecord } = req.body;
  
  Vote
    .findOne({ '$and': [ 
        { idUser },
        { idGame }
     ]})
    .exec()
    .then(function(votes) {
      if (votes) {
        return throwFailed(res, 'You have already voted')
      }

      const newVote = new Vote({
        idUser,
        idGame,
        idRecord
      })

      newVote.save(function(err, docs) {
        res.json({success: true, doc: docs});
      });
        
    });
});

gameRoutes.post('/clear', function(req, res) {
  // const { idComment } = req.body;

  // Comment.remove({'_id': idComment}, (err) => {
  //   if(err) throw err;
  //   res.json({ success: true, message: 'comment clear' });
  // });
});

module.exports = gameRoutes;
