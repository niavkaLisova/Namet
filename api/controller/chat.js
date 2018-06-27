const express = require('express')
const _ = require('lodash')
const bson = require('bson')

const Room = require('../models/room')
const Message = require('../models/message')
const config = require('../config/config')

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
		]}
		)
		.sort({'lastTime': -1})
		.exec()
	    .then(function(room) {
	    	res.json(room);
	    });
});

chatRoutes.post('/room/new', function(req, res) {
    Room
	    .findOne(
	    { "$and": [ 
		    { "between": { "$all": req.body.between } },
		    { "between": { "$size": req.body.between.length } }
		]})
	    .exec()
	    .then(function(room) {
	    	if (room != null ) {
	        	return throwFailed(res, 'There is already such room exist.');
	    	} 
	    	
	    	let data = req.body;
	    	data.lastTime=new Date().getTime();

    		const newRoom = new Room(data);
		    newRoom.save(function (err, data) {
		    	if(err) {
		    		console.log(err);
		        	return res.status(500).json({msg: 'internal server error'});
		      	}

	      		res.json(data);
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

	try {
    	const { message } = await Room.addMessage(roomId, { text, author });
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
    	return res.json({
      		error: false,
     		message: (await Message.find({ roomID: roomId, delUser: { $ne: user }}).sort({createdAt:-1}).limit(limit * 2).populate('room')).reverse(),
    	});
  	} catch (e) {
    	return res.json({ error: true, message: 'Cannot fetch message' });
  	}
});

chatRoutes.post('/message/read', function(req, res) {
	const { id, roomId } = req.body;

	const userInfo = {
	      read: true
	};

	Message.update({ roomID: roomId, read: false, author: { $ne: id } }, { $set: userInfo }, {'multi': true}, function (err, updateMsg) {
	    if (err) throw err;

	    Message.find({ roomID: roomId, user: id}, function(err, messages) {
	    	if (err) throw err;
	    	res.json(messages)
	    })
	});
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