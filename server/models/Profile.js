const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "non-binary", "other", "prefer not to say"],
    default: "prefer not to say",
  },
  birthDate: {
    type: Date,
    required: [true, "Birthdate is required"],
  },
  description: {
    type: String,
  },
  isSitter: {
    type: Boolean,
    default: false,
  },
  availability: [
    {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },
  ],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\+1 \(\d{3}\) \d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "Phone number required"],
  },
  photo: {
    type: String,
  },
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  stripe: {
    customerId: {
      type: String,
    },
    accountId: {
      type: String,
    },
  },
  hourlyRate: {
    type: Number,
    default: 14.25,
  },
  /*
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
  },
  */
  rating: {
    average: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  jobTitle: {
    type: String,
    enum: [
      "Loving Pet Sitter",
      "Professional Dog Trainer",
      "Loving Dog Walker",
      "Dog Care Helper",
      "Loving Dog Gromer",
    ],
    default: "Loving Pet Sitter",
  },
  notifications: [
    {
      title: { type: String },
      message: { type: String },
      src: { type: String },
      link: { type: String },
    },
  ],
  address: {
    type: String,
  },
});

profileSchema.statics.applyRating = async function (sitter_id, score) {
  const sitter = await Profile.findById(sitter_id);
  const {
    rating: { total, average },
  } = sitter;
  sitter.rating.total = total + 1;
  sitter.rating.average = (average + score) / (total + 1);
  await sitter.save();
};

profileSchema.pre("save", function (next) {
  if (this.availability) {
    this.availability.forEach((range) => {
      const isNegativeRange = range.end < range.start;
      if (isNegativeRange) {
        throw new Error(
          "Date ranges must have a start date before the end date"
        );
      }
    });
  }

  const today = new Date();
  const isUnderEighteen =
    today.getFullYear() - this.birthDate.getFullYear() < 18;
  if (isUnderEighteen) {
    throw new Error("User must be 18 years old");
  }
  next();
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
