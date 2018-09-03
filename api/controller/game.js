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

gameRoutes.post('/find/game/by/id', function(req, res) {
  const { id } = req.body;

  Game
    .findById(id)
    .exec()
    .then(function(game) {
      res.json({success: true, doc: game});
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

gameRoutes.post('/vote/count', function(req, res) {
  const { idGame, idRecord } = req.body;
  
  Vote
    .find({ '$and': [ 
        { idRecord },
        { idGame }
     ]})
    .exec()
    .then(function(votes) {
      res.json({success: true, doc: votes.length});    
    });
});

gameRoutes.post('/result/count', function(req, res) {
  const { idGame } = req.body;
  
  let agg = [
    {$group: {
      _id: "$idRecord",
      total: {$sum: 1}
    }}
  ];

  Vote.aggregate(agg, function(err, logs){
    if (err) { return def.reject(err); }

    return res.json(logs.slice(0, 3));
  });
});

gameRoutes.post('/update', function(req, res) {
  const { id, thema, status } = req.body;
  
  Game
    .update({ _id: id }, { thema, status }, function (err, game) {
    if (err) throw err;

    res.json(game)
  });
});

gameRoutes.post('/delete', function(req, res) {
  const { idGame } = req.body;

  Vote.remove({ idGame: id }, err => {
    if(err) throw err;
    Game.remove({'_id': id}, (err) => {
      if(err) throw err;
      res.json({ success: true, message: 'game deleted' });
    });
  })
});

module.exports = gameRoutes;
