const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
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
}, {timestamps: true});

const Message = model("Message", messageSchema);

module.exports = Message;
