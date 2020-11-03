const { Schema, model } = require("mongoose");
const Profile = require("./Profile");

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
};

requestSchema.methods.pay = function () {
  // Add logic for paying
  this.paid = true;
};

requestSchema.pre("save", function (next) {
  const endIsBeforeStart = this.end < this.start;
  if (endIsBeforeStart) {
    throw new Error("End date of request must be after Start date");
  }
  if (this.accepted && this.declined) {
    throw new Error("Request cannot be both accepted and declined");
  }
  if (this.isNew) {
    Profile.findById(this.user_id).then(user => {
      user.requests.push(this._id);
      user.save();
    });
    Profile.findById(this.sitter_id).then((user) => {
      user.requests.push(this._id);
      user.save();
    });
  }
  next();
});

const Request = model("Request", requestSchema);

module.exports = Request;
