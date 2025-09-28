const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const { getUser } = require("../controllers/user.controller");

//login
router.get('/login', getUser);


module.exports = router;
