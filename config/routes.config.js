const router = require("express").Router();
const passport = require("passport");
const fileUploader = require("./cloudinary.config");
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");
const restaurantController = require('../controllers/restaurant.controller');
const userController = require('../controllers/user.controller');

const SCOPES = ["profile", "email"];

// AUTH
router.get("/", (req, res, next) => res.json({ ok: true }));
router.post("/register", authController.register);
router.get("/activate/:token", authController.activateAccount);
router.post("/login", authController.login);
router.get("/login/google", passport.authenticate("google-auth", { scope: SCOPES }));
router.get("/auth/google/callback", authController.loginGoogle);
router.get("/users/me", authMiddleware.isAuthenticated, authController.getCurrentUser);

// RESTAURANTS CRUD
router.get("/restaurant/list", authMiddleware.isAuthenticated, restaurantController.getAllRestaurants);
router.get("/restaurant/:id", authMiddleware.isAuthenticated, restaurantController.getOneRestaurant);
router.get("/restaurant/list/:user", authMiddleware.isAuthenticated, restaurantController.getUserRestaurants);
router.post("/restaurant/create", authMiddleware.isAuthenticated, fileUploader.array("images", 10), restaurantController.createRestaurant);
router.post("/restaurant/edit", authMiddleware.isAuthenticated, fileUploader.array("images", 10), restaurantController.editRestaurant);
router.delete("/restaurant/delete/:id", authMiddleware.isAuthenticated, fileUploader.array("images", 10), restaurantController.deleteRestaurant);

// USERS FAVS
router.get("/favourite/:user", authMiddleware.isAuthenticated, userController.getAllFavs);
router.get("/favourite/:restaurant/:user", authMiddleware.isAuthenticated, userController.getOneFav);
router.post("/favourite/create", authMiddleware.isAuthenticated, userController.createFav);
router.delete("/favourite/delete/:restaurant/:user", authMiddleware.isAuthenticated, userController.deleteFav);

module.exports = router;