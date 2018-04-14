const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var path = require('path');

const config = require('./config/config.js')
const allowCrossDomain = require('./headers/cross-domain')
const userRoutes = require('./controller/user')
const chatRoutes = require('./controller/chat')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(allowCrossDomain);

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
mongoose.connect(config.database);

var server = app.listen(process.env.PORT || 3000, () => {
  console.log('listening on 3000')
})

var io = require('socket.io')(server);

io.on('connection', function(socket){    
	socket.on('message', function(msg){
	    socket.emit('message', msg);
	    socket.broadcast.emit('broadcast', msg);
	});

    socket.on('disconnect', function(){
        socket.emit('userList', 'no');
        socket.broadcast.emit('userList', 'no');
    });
});
app.use('/api', userRoutes);
app.use('/chat', chatRoutes);
