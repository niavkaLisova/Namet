const express = require('express')
const passwordHash = require('password-hash')
const jwt    = require('jsonwebtoken')
const _ = require('lodash')
const bson = require('bson')
const nodemailer = require('nodemailer')

const Room = require('../models/room')
const User = require('../models/user')
const BlackList = require('../models/blackList')
const config = require('../config/config')
const { ObjectId } = require('mongodb');
 
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
    .findOne({ '$or': [ 
        { 'email': email },
        { 'name': email }
     ]}  )
    .exec()
    .then(function(user) {
      if (!user) {
        return throwFailed(res, 'Authentication failed. User not found.');
      }

      const psswordRes = passwordHash.verify(password, user.password);
      if (psswordRes) {
        console.log('USER', user._id)
        setTimeout(function() {
          return res.json({
            token: generateToken(email),
            userId: user._id
          });
        }, config.delay);
      } else {
        return throwFailed(res, 'Authentication failed. Wrong password.');
      }
    });
});

userRoutes.post('/register', function(req, res) {
  const password = req.body.password
  const email = req.body.email

  if (!email || !password) {
    return throwFailed(res, 'Cannot register. Provide email or password.');
  }

  BlackList
    .findOne({email})
    .exec()
    .then(function(list) {
      if (list) {
        return throwFailed(res, 'Your email address is on blacklist.');
      } else {
        User
          .findOne({ email: email })
          .exec()
          .then(function(user) {
            if (user) {
              return throwFailed(res, 'There is already user with such email.');
            }

            let hash = passwordHash.generate(password);
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
      }
    })

  
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
      if(user && (user.activeRoom != 0)) {
      console.log(user.activeRoom, 'active', typeof(user.activeRoom));
        Room
          .find({_id: user.activeRoom}).exec().then(function(docs) {
            // console.log('room', docs, docs.length);
            if(docs.length == 0) {
              user.activeRoom = 0;
              user.save();
            }
            res.json(user);
          })
        } else { 
          res.json(user)
        }
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
  const regexp = new RegExp(search);
  User
      .find({ 'nickname': regexp }, {name: 1, email: 1, nickname: 1, _id: 1})
      .where('_id').ne(id)
      .where('email').ne('admino')
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

userRoutes.post('/users/send/complaint', function(req, res) {
  User.update({ _id: req.params.id }, { activeRoom: req.body.active }, function (err, user) {
    if (err) throw err;
    
    res.json(user)
  });
});

/** settings **/

userRoutes.post('/upload', function(req, res) {
  const files = req.files;
  const file = files.file;

  const name = ObjectId();

  if (!files)
    return res.status(400).send('No files were uploaded.');

  file.mv(`../front/dist/upload/${name}.jpg`, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send(name);
  });
});

/** end settings **/

module.exports = userRoutes;
