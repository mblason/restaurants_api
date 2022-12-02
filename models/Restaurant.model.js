const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    neighborhood: {
      type: String,
      required: [true, "Neighborhood is required."],
    },
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    images: {
      type: Array,
      required: [true, "At least upload one image."],
    },
    cuisine_type: {
      type: String,
      required: [true, "Cuisine type is required."],
    },
    operating_hours: {
      Monday: { type: String },
      Tuesday: { type: String },
      Wednesday: { type: String },
      Thursday: { type: String },
      Friday: { type: String },
      Saturday: { type: String },
      Sunday: { type: String }
    },
    hasReviews: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

RestaurantSchema.virtual("favourite", {
  ref: "Favourite",
  localField: "_id",
  foreignField: "restaurant",
  justOne: true,
});

RestaurantSchema.virtual("review", {
  ref: "Review",
  localField: "_id",
  foreignField: "restaurant",
  justOne: true,
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
