const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Comment', new Schema({
    author: String,
    idRecord: String,
    text: String,
   	answerer: String
}, { timestamps: true })
);
