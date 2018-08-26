const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Record', new Schema({
	title: String,
	text: String,
	author: String,
	authorName: String,
	type: [],
	review: String,
	gift: String,
	coin: { type: Object, default: {} },
	state: String,
	describe: String,
	img: String,
	genre: String,
	language: String,
	section: String
}, { timestamps: true }));
