const express = require("express");
const { getGuest } = require("../controller/guest.controller");
// const { getGuest } = require("../controller/guest.controller");

const router = express.Router();

// router.post('/', createGuest);
// router.get("/", getGuest);
// router.patch('/:id/update', updateGuest);
router.get('/', getGuest)

module.exports = router;
