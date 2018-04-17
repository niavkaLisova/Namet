const User = require('./models/user')

exports = module.exports = function(io) {
	io.on('connection', function(socket){
		let id;
		socket.emit('online', socket.id);

		socket.on('get info', function(data) {
			id = data;
		});
	 
		socket.on('message', function(data){
			console.log('room', socket.rooms)
			console.log('emit message', data.roomId);
			socket.to(data.roomId).emit('message', data.msg);
		});

		socket.on('leave room', function(room) {
	      socket.leave(room)
	    })

	    socket.on('join room', function(room) {
	      socket.join(room)
	      console.log('joi room', room);
	    })

	    socket.on('disconnect', function(){
			User.update({ _id: id }, { $pull: { online: { $in: [ socket.id ] } }}, function (err, user) {
		    	if (err) throw err;
		  	});//
	
	        socket.broadcast.emit('userList', 'no');
	    });
	});
}