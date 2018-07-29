const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Sections', new Schema({
	title: String,
	describe: String,
	userId: String
}));
