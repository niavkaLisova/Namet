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
    coin: Object,
    timePoint: { type: String, default: (new Date()).getTime() },
    status: String,
    sticky0: String,
    sticky1: String,
    birthday: String,
    gender: String,
    country: String,
    city: String,
    avatar: { type: String, default: 'noname.png' },
    following: { type: Array, default: [] }
}));
