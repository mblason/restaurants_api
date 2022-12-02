const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ROUNDS = 10;

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [EMAIL_PATTERN, "Email is not valid."],
      trim: true,
      lowercase: true,
      unique: [
        true,
        "This email is already in use. Please, choose another one.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must have at least 8 characters"],
    },
    image: {
      type: String,
      default:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    },
    status: {
      type: Boolean,
      default: false,
    },
    googleID: {
      type: String,
    },
    activationToken: {
      type: String,
      default: () => {
        return Math.random().toString(36).substring(7);
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        delete ret.password;

        return ret;
      },
    },
  }
);

UserSchema.virtual("favourite", {
  ref: "Favourite",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

UserSchema.virtual("review", {
  ref: "Review",
  localField: "_id",
  foreignField: "userWhoReviewed",
  justOne: true,
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
    .hash(this.password, ROUNDS)
    .then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

UserSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;