const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Team', new Schema({
	name: String,
    emblem: String,
    color: String,
    point: String
}));
