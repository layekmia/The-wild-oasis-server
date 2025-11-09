import express from "express";
import { getGuest } from "../controller/guest.controller.js";
// const { getGuest } = require("../controller/guest.controller");

const router = express.Router();

// router.post('/', createGuest);
// router.get("/", getGuest);
// router.patch('/:id/update', updateGuest);
router.get('/', getGuest)

export default router;
