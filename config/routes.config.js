const router = require("express").Router();
const passport = require("passport");
const fileUploader = require("./cloudinary.config");
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");
const restaurantController = require('../controllers/restaurant.controller');

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






module.exports = router;