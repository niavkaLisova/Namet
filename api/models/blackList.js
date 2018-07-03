const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('BlackList', new Schema({
    email: String
}, { timestamps: true })
);
