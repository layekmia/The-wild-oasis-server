const express = require("express");
const { getSetting } = require("../controller/setting.controller");

const router = express.Router();

router.get("/", getSetting);

module.exports = router;
