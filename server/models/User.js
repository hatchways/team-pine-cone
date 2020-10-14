const { Schema, model } = require('mongoose');
const { hash } = require('bcryptjs');

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

userSchema.statics.createUser = async function(email, password) {
	const hashedPassword = await hash(password, 10);
	const user = await User.create({ email, password: hashedPassword });
	return user;
}

const User = model('User', userSchema);

module.exports = { userSchema, User };
