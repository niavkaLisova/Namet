const express = require('express')
const bcrypt = require('bcrypt')
const jwt    = require('jsonwebtoken')
const _ = require('lodash')
const bson = require('bson')
const User = require('../models/user')
const config = require('../config/config')
var nodemailer = require('nodemailer');

const userRoutes = express.Router();

var throwFailed = function (res, message) {
  return res.json({ success: false, message: message });
}

var generateToken = function (username) {
  return jwt.sign({ name: username }, config.secret, { expiresIn: '100m' })
}

userRoutes.post('/authenticate', function(req, res) {
  const email = req.body.email
  const password = req.body.password

  if (_.isUndefined(email) || _.isUndefined(password)) {
    return throwFailed(res, 'Authentication failed. User not found.');
  }

  User
    .findOne({ "$or": [ 
        { "email": email },
        { "name": email }
     ]}  )
    .exec()
    .then(function(user) {
      if (!user) {
        return throwFailed(res, 'Authentication failed. User not found.');
      }

      bcrypt.compare(password, user.password, function(errBcrypt, resBcrypt) {
        if (resBcrypt == false) {
          return throwFailed(res, 'Authentication failed. Wrong password.');
        }

        setTimeout(function() {
          return res.json({
            token: generateToken(email),
            userId: user._id
          });
        }, config.delay);
      });
    });
});

userRoutes.post('/register', function(req, res) {
  const password = req.body.password
  const email = req.body.email

  if (!email || !password) {
    return throwFailed(res, 'Cannot register. Provide email or password.');
  }

  User
    .findOne({ email: email })
    .exec()
    .then(function(user) {
      if (user) {
        return throwFailed(res, 'There is already user with such email.');
      }

      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, function(err, hash) {
          var user = new User({
            name: email,
            nickname: email,
            email: email,
            password: hash,
            admin: false,
            online: [],
            confirm: false,
            activeRoom: 0
          });

          user.save(function(err, doc) {
            if (err) throw err;
            return res.json({ success: true, message: 'User registered successfully.', doc });
          });
      });
    });
});

// const tokenVerifier = require('../auth/token-verifier')
// userRoutes.use(tokenVerifier);

userRoutes.get('/users/:id', function(req, res) {
  let userId = req.params.id;

  if (!bson.ObjectId.isValid(userId)) {
    return res.json({error: 'There is no id defined'});
  }

  User
    .findOne({ _id: userId })
    .exec()
    .then(function(user) {
      setTimeout(function() {
        res.json({
          name: user.name,
          nickname: user.nickname,
          email: user.email,
          id: user._id,
          online: user.online,
          activeRoom: user.activeRoom
        })
      }, config.delay);
    });
});

userRoutes.post('/users/:id', function(req, res) {
  const userInfo = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email
  };

  User.update({ _id: req.params.id }, { $set: userInfo}, function (err, user) {
    if (err) throw err;

    res.json(user)
  });
});

userRoutes.post('/users/online/:id', function(req, res) {
  User.update({ _id: req.params.id }, { $addToSet: {online: req.body.online}}, function (err, user) {
    if (err) throw err;

    res.json(user)
  });
});

userRoutes.post('/users/online/del/:id', function(req, res) {
  User.update({ _id: req.params.id }, { $pull: { online: { $in: [ req.body.online ] } }}, function (err, user) {
    if (err) throw err;
    
    res.json(user)
  });
});

userRoutes.post('/users/room/active/:id', function(req, res) {
  //console.log('room active', req.params.id, req.body.active);
  User.update({ _id: req.params.id }, { activeRoom: req.body.active }, function (err, user) {
    if (err) throw err;
    
    res.json(user)
  });
});


userRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

userRoutes.post('/user/find', function(req, res) {
  const { id, search } = req.body;
  const regexp = new RegExp("^"+ search);
  User
      .find({ "name": regexp }, {name: 1, email: 1, nickname: 1, _id: 1})
      .where('_id').ne(id)
      .limit(10)
      .exec()
      .then(function(messages) {
        res.json(messages);
      });
});

userRoutes.post('/send/email', function(req, res) {
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'niavkaLisova@gmail.com',
      pass: 'Mh564515'
    }
  }));

  var mailOptions = {
    from: 'niavkaLisova@gmail.com',
    to: 'mazurHalinaPost@gmail.com',
    subject: 'Sending Email using Node.js[nodemailer]',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

userRoutes.post('/email/confirm', function(req, res) {
  let { receiver, subject, text } = req.body;

  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'nametUnterstutzung@gmail.com',
  //     pass: 'nadiabeka1'
  //   }
  // });

  // var mailOptions = {
  //   from: 'nametUnterstutzung@gmail.com',
  //   to: receiver,
  //   subject: subject,
  //   text: text
  // };

  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //     res.json(false);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //     res.json(true);
  //   }
  // });
});

userRoutes.post('/confirm/email/:email/:id', function(req, res) {
  User.update({ _id: req.params.id }, { confirm: true }, function (err, user) {
    if (err) throw err;
    
    res.json(user)
  });
});

module.exports = userRoutes;
