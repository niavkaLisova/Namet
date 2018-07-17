const express = require('express')
const _ = require('lodash')
const bson = require('bson')
const fs = require('fs')

const Room = require('../models/room')
const Message = require('../models/message')
const User = require('../models/user')
const BlackList = require('../models/blackList')
const Report = require('../models/report')
const Team = require('../models/team')
const config = require('../config/config')

const adminRoutes = express.Router();

adminRoutes.post('/junior/find', function(req, res) {
  	const { id, search } = req.body;
  	const regexp = new RegExp(search);

  	User
    	.find({ 'nickname': regexp,'admin': false, banned: '' }, {name: 1, email: 1, nickname: 1, _id: 1, admin: 1})
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
  const { id } = req.body;

  User
    .findOne({ '_id': id})
    .exec()
    .then(function(user) {
      Room
        .find({ "between": { $elemMatch: {$in: [String(user._id)] }}},  function(err, roomsRes) {
          if(err) throw err;

          const rooms = [];
          roomsRes.map(room => {
            rooms.push(room._id)
            room.remove();
          });

          if(rooms.length > 0) {

            let list = new BlackList({
              email: user.email
            })
            list.save(function(err, docs) {
              user.remove();
              res.json(list);

              rooms.map(room => {
                Message
                  .remove({'roomID': room}, (err) => {
                  if(err) throw err;       
                });
              })
            })
          }
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

adminRoutes.post('/black/list/remove', function(req, res) {
  const { id } = req.body;

  BlackList.remove({'_id': id}, (err) => {
    if(err) throw err;
    res.json({ success: true, message: 'removed from black llist' });
  });
});

adminRoutes.post('/send/report', function(req, res) {
  const { donor, report } = req.body;

  if (report.type == 'complaint') {
    console.log('complaint ', report.time);
    User
      .findOne({'_id': report.discuss})
      .exec()
      .then(function(user) {
        if(user.banned == report.time) {
           const newReport = new Report({
            donor,
            type: report.type,
            text: report.text,
            discuss: report.discuss
          })

          newReport.save(function(err, docs) {
            res.json(docs);
          });
        }
      });
  } else { 
    const newReport = new Report({
      donor,
      type: report.type,
      text: report.text,
      discuss: report.discuss
    })

    newReport.save(function(err, docs) {
      res.json(docs);
    })
  }
});

adminRoutes.get('/get/report', function(req, res) {
  Report
    .find()
    .exec()
    .then(function(reports) {
      res.json(reports);
    });
}); 

adminRoutes.post('/delete/report', function(req, res) {
  const { id } = req.body;

  Report.remove({'_id': id}, (err) => {
    if(err) throw err;
    res.json({ success: true, message: 'removed from reports' });
  });
});

adminRoutes.post('/create/team', function(req, res) {
    const { name, emblem, color } = req.body;

    let team = new Team({
      name,
      emblem,
      color
    })

    team.save(function(err, docs) {
      res.json(docs);
    });
});

adminRoutes.get('/get/team', function(req, res) {
  Team
    .find()
    .exec()
    .then(function(reports) {
      res.json(reports);
    });
}); 

adminRoutes.post('/edit/team', function(req, res) {
    const { img, team } = req.body;
    const oldEmblem = team.emblem;

    console.log(team, 'team', img);

    if (!img) {
      Team
        .update({ '_id': team._id}, 
          { 
            color: team.color,
            name: team.name
          })
        .exec()
        .then(function(team) {
          res.json(team);
        });
    } else {
      Team
        .update({ '_id': team._id}, 
          { 
            color: team.color,
            name: team.name,
            emblem: img
          })
        .exec()
        .then(function(team) {
          const link = '../front/dist/upload/' + oldEmblem;

          fs.unlink(link,function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
            res.json(team);
          }); 
        });
    }
});

module.exports = adminRoutes;