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
        type: [String],
        required: [true, "Images are required."],
    },
    cuisine_type: {
        type: String,
        required: [true, "Cuisine type is required."],
    },
    operating_hours: {
        type: String,
        required: [true, "Cuisine type is required."],
    },
    hasReviews: {
        type: Boolean,
        default: false
    }
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
    toObject: {
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
