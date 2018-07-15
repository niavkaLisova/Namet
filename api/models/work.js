const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Record', new Schema({
	title: String,
	text: String,
	author: String,
	authorName: String,
	wall: Boolean,
	work: Boolean,
	review: Boolean,
	gift: String,
	coin: [],
	state: String

}, { timestamps: true }));
