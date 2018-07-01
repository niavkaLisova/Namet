const express = require('express')
const _ = require('lodash')
const bson = require('bson')
const crypto = require('crypto')
const algorithm = 'aes-256-ctr'
const password = 'd6F3Efeq'

const Room = require('../models/room')
const Message = require('../models/message')
const User = require('../models/user')
const config = require('../config/config')

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

const chatRoutes = express.Router();

var throwFailed = function (res, message) {
  return res.json({ success: false, message: message });
}

chatRoutes.post('/room/all', function(req, res) {
	Room
	    .find(
	    { "$and": [ 
		    { "between": { $elemMatch: {$in: [req.body.userId] }}}
		    ,{ "between": { $size: 2 } }
			],
			delUser: { $ne: req.body.userId }}
		)
		.sort({'lastTime': -1})
		.exec()
	    .then(function(room) {
			res.json(room);
	    });
});

chatRoutes.post('/room/new', function(req, res) {
	const { userId, between } = req.body
    Room
	    .findOne(
	    { "$and": [ 
		    { "between": { "$all": between } },
		    { "between": { "$size": between.length } }
		]})
	    .exec()
	    .then(function(room) {
	    	if (room != null ) {
	    		if(room.delUser.includes(userId)) {
		    		let delUser = room.delUser.find((user) => {
		    			return user != userId 
		    		})

		    		if(!delUser) {
		    			delUser = [];
		    		}

		    		room.delUser = delUser;
		    		room.save();
		    		
		    		res.json({data: room, socket: false});
		    		return false;
		    	} else {
		        	return throwFailed(res, 'There is already such room exist.');
	    		}
	    	} 
	    	
	    	let data = req.body;
	    	data.lastTime=new Date().getTime();

    		const newRoom = new Room(data);
		    newRoom.save(function (err, data) {
		    	if(err) {
		    		console.log(err);
		        	return res.status(500).json({msg: 'internal server error'});
		      	}

	      		res.json({data, socket: true});
	    	});
	    });	
});

chatRoutes.get('/room/:id', function(req, res) {
	Room
	    .findById(req.params.id)
	    .exec()
	    .then(function(room) {
	    	res.json(room);
	    });
});

chatRoutes.post('/message/new', async function(req, res) {
	const { roomId, text, author } = req.body;
	let textEn = encrypt(text);

	try {
    	const { message } = await Room.addMessage(roomId, { text: textEn, author });
    	return res.json(message);
  	} catch (e) {
    	return res.status(400).json({ error: true, message: 'Message cannot be created!' });
  	}
});

// chatRoutes.post('/message/all', function(req, res) {
// 	const { roomId, user, limit } = req.body;

// 	Message
// 	    .find({ "roomID": roomId, 'user': user })
// 	    .sort({createdAt:-1})
// 	   	.limit(limit)
// 	    .exec()
// 	    .then(function(messages) {
// 	    	res.json(messages.reverse());
// 	    });
// });

chatRoutes.post('/message/unread', function(req, res) {
	Message
	    .find({ 'user': req.body.user, read: false })
	    .exec()
	    .then(function(messages) {
	    	res.json(messages);
	    });
});

chatRoutes.post('/message/make/read', function(req, res) {
	// console.log(req.body)
	Message
	    .update({ '_id': req.body.id}, {read: true })
	    .exec()
	    .then(function(messages) {
	    	res.json(messages);
	    });
});

chatRoutes.post('/message/room', async function(req, res) {
	const { roomId, user, limit } = req.body;

	const room = await Room.findById(roomId);

	if (!room) {
		return res.json({ error: true, message: 'Room not exist' });
  	}

  	try {
  		Message
  			.find({ roomID: roomId, delUser: { $ne: user }})
  			.sort({createdAt:-1})
  			.limit(limit * 2)
  			.then((msgs) => {
  				msgs.map((msg, key) => {
  					msgs[key].text = decrypt(msg.text)
  				})
  				return res.json({
		      		error: false,
		     		message: msgs.reverse()
		    	});
  			})
  	} catch (e) {
    	return res.json({ error: true, message: 'Cannot fetch message' });
  	}
});

chatRoutes.post('/message/read', function(req, res) {
	function makeRead(roomID, id, userInfo) {
		Message.update({ roomID, read: false, author: { $ne: id } }, { $set: userInfo }, {'multi': true}, function (err, updateMsg) {
		    if (err) throw err;

		    Message.find({ roomID, user: id}, function(err, messages) {
		    	if (err) throw err;
		    	res.json(messages)
		    })
		});
	}
	const { id, roomId } = req.body;
	
	const userInfo = {
	    read: true
	};

	if(roomId) {
		makeRead(roomId, id, userInfo);
	} else {
		User
			.findOne({'_id': id})
			.exec()
			.then(function(user) {
				if(user.activeRoom != '0') {
					makeRead(user.activeRoom, id, userInfo)
				} else {
					res.json('no')
				}
			})
	}
});

chatRoutes.post('/room/delete/user', function(req, res) {
	const { msgId, user, len } = req.body;

	Message
		.findOne({'_id': msgId})
		.exec()
		.then(function(msg) {
			if((len - 1) == msg.delUser.length) {
				msg.remove();	
			} else {
				msg.delUser.push(user);
				msg.save();
			}
	})
});

chatRoutes.post('/delete/room', function(req, res) {
	const { roomId, user, len } = req.body;

	Room
		.findOne({'_id': roomId})
		.exec()
		.then(function(docs) {
			if((len - 1) == docs.delUser.length) {
				docs.remove();	
			} else {
				docs.delUser.push(user);
				docs.save();
			}

			User.findById(user)
			  .exec()
			  .then(function(findUser) {
				findUser.activeRoom = '0';
				findUser.save();
			  })
			res.json({ success: true, message: 'ok' })
	})
});

chatRoutes.post('/room/delete/messages', function(req, res) {
	const { roomId, user, len } = req.body;

	Message
		.find({'roomID': roomId})
		.exec()
		.then(function(docs) {
			docs.map((doc) => {
				if((len - 1) == doc.delUser.length) {
					doc.remove();	
				} else {
					doc.delUser.push(user);
					doc.save();
				}
			})
	})
	
});

chatRoutes.post('/message/select/unread', function(req, res) {
	const { id, roomId } = req.body;

	Message
	    .find({roomID: roomId, read: false})
	    .where('author').ne(id)
	    .exec()
	    .then(function(messages) {
	    	res.json(messages);
	    });
});

module.exports = chatRoutes;