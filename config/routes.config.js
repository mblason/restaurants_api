const router = require("express").Router();
const passport = require("passport");
const fileUploader = require("./cloudinary.config");
const authController = require("../controllers/auth.controller");
//const authMiddleware = require("../middlewares/auth.middleware");

// AUTH
router.get("/", (req, res, next) => res.json({ ok: true }));
router.post("/register", authController.register);
router.get("/activate/:token", authController.activateAccount);
router.post("/login", authController.login);

// HOME

// RESTAURANTS CRUD






module.exports = router;