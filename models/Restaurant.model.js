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
      Monday: { type: String, required: [true, "This field is required."] },
      Tuesday: { type: String, required: [true, "This field is required."] },
      Wednesday: { type: String, required: [true, "This field is required."] },
      Thursday: { type: String, required: [true, "This field is required."] },
      Friday: { type: String, required: [true, "This field is required."] },
      Saturday: { type: String, required: [true, "This field is required."] },
      Sunday: { type: String, required: [true, "This field is required."] },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: {
      type: Array,
      default: false,
    },
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

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
