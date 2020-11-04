const { Schema, model } = require("mongoose");

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
      sender: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
      },
      body: {
        type: String,
        required: true
      }
    },
  ],
});

const Conversation = model(conversationSchema);

module.exports = Conversation;
