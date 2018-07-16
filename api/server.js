const express = require('express')
const fileUpload = require('express-fileupload')
let app = express()
const bodyParser = require('body-parser')
const path = require('path')

app.use(fileUpload());

const config = require('./config/config.js')
const allowCrossDomain = require('./headers/cross-domain')
const userRoutes = require('./controller/user')
const chatRoutes = require('./controller/chat')
const adminRoutes = require('./controller/admin')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(allowCrossDomain);

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
mongoose.connect(config.database);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('listening on 3000')
})

var io = require('socket.io')(server);

const socketEvents = require('./socketEvents')(io);

app.use('/api', userRoutes);
app.use('/chat', chatRoutes);
app.use('/admin', adminRoutes);
