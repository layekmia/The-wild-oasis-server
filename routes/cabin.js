const express = require("express");
const { getCabins, getCabin, getCabinPrice } = require("../controller/cabin.controller");

const router = express.Router();

router.get("/", getCabins);
router.get("/:id", getCabin);
router.get("/:id/cabin/price", getCabinPrice);

module.exports = router;
