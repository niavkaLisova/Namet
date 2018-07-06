const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Report', new Schema({
    type: String,
    donor: String,
    text: String
}, { timestamps: true })
);
