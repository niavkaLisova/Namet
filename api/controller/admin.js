const express = require('express')
const _ = require('lodash')
const bson = require('bson')

const Room = require('../models/room')
const Message = require('../models/message')
const User = require('../models/user')
const BlackList = require('../models/blackList')
const Report = require('../models/report')
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


module.exports = adminRoutes;