const createError = require("http-errors");
const Restaurant = require("../models/Restaurant.model");
const mongoose = require("mongoose");

module.exports.getAllRestaurants = (req, res, next) => {
    Restaurant.find({})
        .then(restaurants => {
            res.status(201).json(restaurants);
        })
        .catch(next);
};

module.exports.getOneRestaurant = (req, res, next) => {
    const { id } = req.params;

    Restaurant.findById(id)
        .then((restaurant) => {
            res.status(201).json(restaurant);
        })
        .catch(next);
};

module.exports.getUserRestaurants = (req, res, next) => {
  const { user } = req.params;

  Restaurant.find({ owner: user })
    .then((restaurants) => {
      res.status(201).json(restaurants);
    })
    .catch(next);
};

module.exports.createRestaurant = (req, res, next) => {
  const { 
    Monday, 
    Tuesday, 
    Wednesday, 
    Thursday, 
    Friday, 
    Saturday, 
    Sunday, 
    address, 
    cuisine_type, 
    name, 
    neighborhood, 
    owner } = req.body;

  const newRestaurant = {
    name,
    neighborhood,
    address,
    cuisine_type,
    operating_hours: {
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday
    },
    owner: mongoose.Types.ObjectId(owner),
  };

  if (req.files) {
    const paths = req.files.map((file) => {
      return file.path;
    });
    newRestaurant.images = paths;
  }

  Restaurant.create(newRestaurant)
    .then((restaurantCreated) => {
      res.status(201).json(restaurantCreated);
    })
    .catch(next);
};

module.exports.editRestaurant = (req, res, next) => {
  const {
    id,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
    address,
    cuisine_type,
    name,
    neighborhood,
    owner
  } = req.body;

  const editRestaurant = {
    name,
    neighborhood,
    address,
    cuisine_type,
    "owner": mongoose.Types.ObjectId(owner),
  };

  if (Monday) {
    editRestaurant["operating_hours.Monday"] = Monday;
  }

  if (Tuesday) {
    editRestaurant["operating_hours.Tuesday"] = Tuesday;
  }

  if (Wednesday) {
    editRestaurant["operating_hours.Wednesday"] = Wednesday;
  }

  if (Thursday) {
    editRestaurant["operating_hours.Thursday"] = Thursday;
  }

  if (Friday) {
    editRestaurant["operating_hours.Friday"] = Friday;
  }

  if (Saturday) {
    editRestaurant["operating_hours.Saturday"] = Saturday;
  }

  if (Sunday) {
    editRestaurant["operating_hours.Sunday"] = Sunday;
  }

  if (req.files) {
    const paths = req.files.map((file) => {
      return file.path;
    });

    editRestaurant.images = paths;
  }

  const filter = { _id: mongoose.Types.ObjectId(id) }

  Restaurant.findOneAndUpdate(filter, editRestaurant)
    .then((restaurantUpdated) => {
      res.status(201).json(restaurantUpdated);
    })
    .catch(next);

};

module.exports.deleteRestaurant = (req, res, next) => {
  const id  = mongoose.Types.ObjectId(req.params.id);

  Restaurant.findByIdAndDelete(id)
  .then(restaurantDeleted => {
    res.status(201).json(restaurantDeleted);
  })
  .catch(next);
}