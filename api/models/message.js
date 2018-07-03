const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = Schema({
  roomID: {
    type: ObjectId,
    ref: 'Room',
  },
  text: String,
  author: String,
  delUser: [],
  read: { 
  	type: Boolean,
  	default: false
  },
  time: Date
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
