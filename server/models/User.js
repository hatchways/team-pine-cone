const {Schema, model} = require('mongoose');

//NOTE Schema will automatically lowercase email
const userSchema = new Schema({
	email: {
		type: String, 
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	}
});

const User = model('User', userSchema);

module.exports = {userSchema, User};
