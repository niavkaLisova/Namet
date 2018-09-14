const express = require('express')
const _ = require('lodash')
const fs = require('fs')
const bson = require('bson')

const Sections = require('../models/sections')
const Record = require('../models/record')
const Feature = require('../models/feature')
const Team = require('../models/team')
const User = require('../models/user')
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

recordRoutes.post('/find/record/wall', function(req, res) {
  const { idUser } = req.body;
  
  Record
    .find({
      author: idUser,
      type: { $elemMatch: {$in: ["wall"]}},
      state: "public"
    })
    .sort({ 'createdAt': -1 })
    .exec()
    .then(function(record) {
      res.json(record);
    });
});

recordRoutes.post('/find/record/recently', function(req, res) {
  let { limit } = req.body;
  if (!limit) limit = 50;

  Record
    .find({
      type: { $elemMatch: {$in: ["work"]}},
      state: "public"
    })
    .limit(limit)
    .sort({ 'createdAt': -1 })
    .exec()
    .then(function(record) {
      res.json(record);
    });
});

recordRoutes.post('/find/recently/idTeam', function(req, res) {
  const { idTeam } = req.body;

  User
    .find({team: idTeam})
    .exec()
    .then(function(users) {
      console.log('users', users);
    })
  // Record
  //   .find({
  //     type: { $elemMatch: {$in: ["work"]}},
  //     state: "public"
  //   })
  //   .sort({ 'createdAt': -1 })
  //   .exec()
  //   .then(function(record) {
  //     res.json(record);
  //   });
});

recordRoutes.post('/send/point', function(req, res) {
  const { idRecord, idUser, point } = req.body;
  
  Record
    .findById(idRecord)
    .exec()
    .then(function(record) {
      let newCoin = record.coin;
      newCoin[point] = record.coin[point] + 1;

      Record
        .update({ _id: idRecord },
          { coin: newCoin }
        , function (err, doc) {
          if (err) throw err;

          res.json({success: true, message: doc})
        });
    })
});

recordRoutes.post('/find/team/by/id', function(req, res) {
  const { id } = req.body;

  Team
    .findById(id)
    .exec()
    .then(function(team) {
      res.json(team);
    });
});

recordRoutes.post('/admin/decision', function(req, res) {
  const { record, team, idAdmin } = req.body;

  Feature
    .findOne({ idOriginal: record._id })
    .exec()
    .then(function(feature) {
      if (feature) return throwFailed(res, 'Already exist');

      Feature
        .find(
          { '$and': [ 
            { idAdmin },
            { createdAt : { 
              $lte: new Date(), 
              $gte: new Date(new Date().setDate(new Date().getDate()-7))
              } 
            }
         ]}
        )
        .sort({createdAt: -1})
        .exec()
        .then(function(docs) {

          if (docs.length > 0) {
            let feature = docs[0];

            feature.idOriginal = record._id;
            feature.idAdmin = idAdmin;
            feature.title = record.title;
            feature.text = record.text;
            feature.author = record.author;
            feature.type = record.type;
            feature.gift = record.gift;
            feature.describe = record.describe;
            feature.img = record.img;
            feature.genre = record.genre;
            feature.language = record.language;
            feature.team = team;

            feature.save(function(err, doc) {
              if (err) throw err;
              return res.json({ success: true, message: 'Record updated successfully.', doc });
            });
          } else {
            let feature = new Feature({
              idOriginal: record._id,
              idAdmin: idAdmin,
              title: record.title,
              text: record.text,
              author: record.author,
              type: record.type,
              gift: record.gift,
              describe: record.describe,
              img: record.img,
              genre: record.genre,
              language: record.language,
              team
            })

            feature.save(function(err, doc) {
              if (err) throw err;
              return res.json({ success: true, message: 'Record added successfully.', doc });
            });
          }

        })
      })
});

recordRoutes.post('/admin/get/decision/team', function(req, res) {
  const { team } = req.body;

  Feature
    .find({ team })
    .exec()
    .then(function(team) {
      res.json(team);
    });
});

recordRoutes.get('/find/top', function(req, res) {
  Record
    .find(
      { '$and': [ 
        { state: 'public' },
        { 
          createdAt : {
            $gte: new Date(new Date().setDate(new Date().getDate()- 30))
          } 
        }
      ]}
    )
    .exec()
    .then(function(records) {
      let result = [];
      records.map(record => {
        let values = Object.values(record.coin);
        let sum = 0;
        values.map(key => sum += key);
        let index =  result.length - 1;
        let flag = true;

        if (index >= 0) {
          while(sum > result[index].point) {
            if (index - 1 >=0) {
              index -= 1;
            } else {
              break;
            }
          }

          if (result[index].point < sum){
            result.splice(index, 0, { record: record, point: sum })
          } else {
            result.push({ record: record, point: sum })
          }
    
        } else{
          result.push({ record: record, point: sum })
        }
      })

      res.json(result);
    });
});

module.exports = recordRoutes;
