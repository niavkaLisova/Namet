var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var messageSchema = Schema({
  roomID: {
    type: ObjectId,
    ref: 'Group',
  },
  text: String,
  author: String,
  user: Object,
  read: false,
  time: Date
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
