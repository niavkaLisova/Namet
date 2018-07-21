const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Collection', new Schema({
	title: String,
	genre: String
}));
