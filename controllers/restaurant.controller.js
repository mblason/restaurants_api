const createError = require("http-errors");
const Restaurant = require("../models/Restaurant.model");

module.exports.getAllRestaurants = (req, res, next) => {
    Restaurant.find({})
    .then(restaurants => {
        res.status(201).json(restaurants)
    })
    .catch(next)  
};
