exports = module.exports = function(io) {
	io.on('connection', function(socket){  
	console.log(socket.rooms)  
		socket.on('message', function(data){
			socket.broadcast.to(data.roomId).emit('message', data.msg);
		});

		socket.on('leave room', function(room) {
	      socket.leave(room)
	    })

	    socket.on('join room', function(room) {
	      socket.join(room)
	    })

	    socket.on('disconnect', function(){
	        // socket.emit('userList', 'no');
	        // socket.broadcast.emit('userList', 'no');
	    });
	});
}