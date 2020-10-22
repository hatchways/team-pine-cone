const { Schema, model } = require("mongoose");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");

//NOTE Schema will automatically lowercase email
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  }
});

userSchema.methods.verifyPassword = async function(password) {
	try { 
		const match = await compare(password, this.password);
		return match;
	} catch (err) {
		throw createError(500, err.message);
	}
};

userSchema.pre("save", async function(next) {
	const user = this;
  if (user.isModified("password")) {
    user.password = await hash(user.password, 10);
  }
  next();
})

//indexes
userSchema.index({ email: 1, profile: 1 });

const User = model("User", userSchema);

module.exports = { userSchema, User };
