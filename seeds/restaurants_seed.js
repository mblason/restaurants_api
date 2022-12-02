const RESTAURANTS = require("../data/restaurants.json");
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant.model");
require("../config/db.config");

mongoose.connection.once("open", () => {
  Restaurant.create(RESTAURANTS)
    .then((createdRestaurants) => {
      console.log("📗 📖 Creating Restaurants...");
      return mongoose.connection.close();
    })
    .then(() => {
      console.log("Connection closed");
      process.exit(1);
    })
    .catch((err) => {
      console.error(err);
      process.exit(0);
    });
});
