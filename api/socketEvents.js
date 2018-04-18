const User = require('./models/user')

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

		socket.on('leave room', function(room) {
	      socket.leave(room)
	    })

	    socket.on('join room', function(room) {
	      socket.join(room)
	    })
	    
	    socket.on('new room', function(data, user_id){
	    	User.findById(user_id, function(err, user) {
	    		user.online.map( (id) => {
	    				console.log('id', id); 
	    				socket.to(id).emit('room created', data);
	    			}
	    		)
	    	})
		});
		
		socket.on('message global', function(id_online, data){
	    	socket.to(id_online).emit('message g', data);
		});

	    socket.on('disconnect', function(){
	    	console.log('disconnect', socket.id);
			User.update({ _id: id }, { $pull: { online: { $in: [ socket.id ] } }}, function (err, user) {
		    	if (err) throw err;
		  	});//
	
	        socket.broadcast.emit('userList', 'no');
	    });
	});
}