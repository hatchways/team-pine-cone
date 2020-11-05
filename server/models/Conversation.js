const { Schema, model } = require("mongoose");
const Profile = require("./Profile");

const conversationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  sitter_id: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  request_id: {
    type: Schema.Types.ObjectId,
    ref: "Request",
    required: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message"
    },
  ],
});

conversationSchema.pre("save", function(next) {
  if (this.isNew) {
    Profile.findById(this.user_id).then((user) => {
      user.conversations.push(this._id);
      user.save();
    });
    Profile.findById(this.sitter_id).then((user) => {
      user.conversations.push(this._id);
      user.save();
    });
  }
  next();
});

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
