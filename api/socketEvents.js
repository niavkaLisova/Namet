const ObjectID = require('mongodb').ObjectID;
const User = require('./models/user')
const Message = require('./models/message')

let adminChat = [];
let chatLength = 30;

exports = module.exports = function(io) {
	io.on('connection', function(socket){
		let id;
		socket.emit('online', socket.id);

		socket.on('connect', function(ups) {
			console.log(ups);
		});

		socket.on('get info', function(data) {
			id = data;
		});
	 
		socket.on('message', function(data){
			socket.to(data.roomId).emit('message', data.msg);
		});

		socket.on('adminChat get messages b', function(){
			socket.emit('adminChat get messages', adminChat);
		});

		socket.on('adminChat push messages b', function(message){
			message._id = new ObjectID();
			adminChat.push(message);
			if(adminChat.length >= chatLength) {
				adminChat.splice(0, 1)
			}

			socket.to('adminChat').emit('adminChat push message', message);
			socket.emit('adminChat push message', message);
		});

		socket.on('type b', function(data){
			socket.to(data.roomId).emit('type', data.user);
		});

		socket.on('type admin b', function(data){
			socket.to('adminChat').emit('type admin', data);
		});

		socket.on('leave room', function(room) {
	      socket.leave(room)
	    })

	    socket.on('join room', function(room) {
	      socket.join(room)
	    })
	    
	    socket.on('reload read message b', function(user_id){
	    	User.findById(user_id, function(err, user) {
	    		if(err) return null

	    		if(user.online && user.online.length > 0) {
		    		user.online.map( (id) => {
		    				socket.to(id).emit('reload read message');
		    			}
		    		)
		    	}
	    	})
		});
	    
	    socket.on('new room', function(data, user_id){
	    	User.findById(user_id, function(err, user) {
	    		user.online.map( (id) => {
	    				socket.to(id).emit('room created', data);
	    			}
	    		)
	    	})
		});
		
		socket.on('message global', function(id_online, data){
	    	socket.to(id_online).emit('message g', data);
		});

		//* Admin section *//

		socket.on('send report', function(){
	    	socket.broadcast.emit('reload report');
		});

		//* end Admin section *//
		
	    socket.on('disconnect', function(){
	    	console.log('disconnect', id, socket.id);
			User.update({ _id: id }, { $pull: { online: { $in: [ socket.id ] } }}, function (err, user) {
		    	if (err) throw err;
		  	});
	
	        // socket.broadcast.emit('userList', 'no');
	    });
	});
}