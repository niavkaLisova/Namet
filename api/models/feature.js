const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Feature', new Schema({
	idOriginal: String,
	idAdmin: String,
	title: String,
	text: String,
	author: String,
	type: [],
	gift: String,
	describe: String,
	img: String,
	genre: String,
	language: String,
	team: String
}, { timestamps: true }));
