const router = require("express").Router();
const passport = require("passport");
const fileUploader = require("./cloudinary.config");
//const authMiddleware = require("../middlewares/auth.middleware");
const SCOPES = ["profile", "email"];

// HOME
router.get("/", (req, res, next) => res.json({ ok: true }));

// AUTH


// RESTAURANTS CRUD

// FAVOURITES









module.exports = router;