import express from 'express'
import {getSetting} from '../controller/setting.controller.js'

const router = express.Router();

router.get("/", getSetting);

export default router;
