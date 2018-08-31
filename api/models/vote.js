const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Vote', new Schema({
    idUser: String,
    idGame: String,
    idRecord: String
}, { timestamps: true })
);
