const createError = require("http-errors");
const Restaurant = require("../models/Restaurant.model");

module.exports.getAllRestaurants = (req, res, next) => {
    Restaurant.find({})
        .then(restaurants => {
            res.status(201).json(restaurants);
        })
        .catch(next);
};

module.exports.getOneRestaurant = (req, res, next) => {
    const { id } = req.params;
    console.log(id)

    Restaurant.findById(id)
        .then((restaurant) => {
            res.status(201).json(restaurant);
        })
        .catch(next);
};
