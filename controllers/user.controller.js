const createError = require("http-errors");
const Favourite = require("../models/Favourite.model");
const mongoose = require("mongoose");

module.exports.getAllFavs = (req, res, next) => {
  const user = mongoose.Types.ObjectId(req.params.user);

  Favourite.find({ user })
    .populate('restaurant')
    .then((favs) => {
      res.status(201).json(favs);
    })
    .catch(next);
};

module.exports.getOneFav = (req, res, next) => {
    const { restaurant, user } = req.params;

    Favourite.find({ restaurant, user })
        .then((fav) => {
            res.status(201).json(fav);
        })
        .catch(next);
};

module.exports.createFav = (req, res, next) => {
    const { restaurant, user } = req.body;

    Favourite.create({ restaurant, user })
        .then((favCreated) => {
            res.status(201).json(favCreated);
        })
        .catch(next);
};

module.exports.deleteFav = (req, res, next) => {
    const user = mongoose.Types.ObjectId(req.params.user);
    const restaurant = mongoose.Types.ObjectId(req.params.restaurant);

    Favourite.findOneAndDelete({ restaurant, user })
        .then((favDeleted) => {
            res.status(201).json(favDeleted);
        })
        .catch(next);
};