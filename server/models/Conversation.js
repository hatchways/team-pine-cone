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
        required: true,
      },
      read_by_sitter: {
        type: Boolean,
        default: false,
      },
      read_by_user: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
