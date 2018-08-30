const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Game', new Schema({
    author: String,
    thema: String,
    players: { type: Array, default: [] },
    status: String
}, { timestamps: true })
);
