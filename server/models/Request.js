const { Schema, model } = require("mongoose");
const Profile = require("./Profile");
const { addWeeks } = require("date-fns");

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
  completed: {
    type: Boolean,
    default: false,
  },
  fulfilled: {
    type: String,
    enum: ["IN_PROGRESS", "PENDING", "COMPLETE"],
    default: "IN_PROGRESS",
  },
  rating: {
    score: {
      type: Number,
      enum: [-1, 0, 1, 2, 3, 4, 5],
      default: -1,
    },
    endDate: {
      type: Date,
    },
  },
});

const checkApplyPendingStatus = async function (request) {
  if (request.paid && request.accept && request.completed) {
    request.fulfilled = "PENDING";
    request.rating.endDate = addWeeks(new Date(), 1).toISOString();
  }
};

requestSchema.methods.accept = function () {
  this.declined = false;
  this.accepted = true;
  checkApplyPendingStatus(this);
};

requestSchema.methods.pay = function () {
  // Add logic for paying
  this.paid = true;
  checkApplyPendingStatus(this);
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
    Profile.findById(this.user_id).then((user) => {
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

requestSchema.pre("save", function (next) {
  if (this.fulfilled === "PENDING") {
    const { endDate, score } = this.rating;
    if (score === -1 && new Date() > endDate) {
      this.fulfilled = "COMPLETE";
    } else if (score > -1) {
      this.fulfilled = "COMPLETE";
      return Profile.applyRating(this.sitter_id, score).then(() => next());
    }
  }
  return next();
});

const Request = model("Request", requestSchema);

module.exports = Request;
