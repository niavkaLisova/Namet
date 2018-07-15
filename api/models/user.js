var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    name: { type:String, unique: true },
    nickname: String,
    email: { type:String, unique: true },
    password: String,
    admin: Boolean,
    critic: Boolean,
    online: [],
    confirm: Boolean,
    activeRoom: String,
    banned: { 
		type: String,
	  	default: ''
	},
    team: String,
    coin: [],
    status: String,
    sticky1: String,
    sticky2: String
}));
