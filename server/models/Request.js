const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
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
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  declined: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

requestSchema.methods.accept = function () {
  this.declined = false;
  this.accepted = true;
  this.save();
};

requestSchema.methods.decline = function () {
  this.accepted = false;
  this.declined = true;
  this.save();
};

requestSchema.methods.pay = function () {
  // Logic for paying
  this.paid = true;
  this.save();
};



const Request = model("Request", requestSchema);

module.exports = Request;
