const express = require("express");
const router = express.Router();

const { Signup } = require("../controller/SignUp");
const { Login } = require("../controller/SignUp");
const { auth } = require("../middleware/auth");

router.post("/register", Signup);
router.post("/login", Login);
router.post ("/role", auth);
module.exports = router;