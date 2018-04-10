const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var path = require('path');

const config = require('./config/config.js')
const allowCrossDomain = require('./headers/cross-domain')
const userRoutes = require('./controller/user')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(allowCrossDomain);

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
mongoose.connect(config.database);

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on 3000')
})

// app.use('/', function(req, res) {
// 	res.sendFile(path.join(__dirname, '../front/dist/index.html'));
// });

app.use('/api', userRoutes);
