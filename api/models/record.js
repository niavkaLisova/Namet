const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Record', new Schema({
	title: String,
	text: String,
	author: String,
	authorName: String,
	wall: Boolean,
	work: Boolean,
	chat: String,
	review: String,
	gift: String,
	coin: [],
	state: String,
	describe: String,
	img: String,
	language: String
}, { timestamps: true }));
