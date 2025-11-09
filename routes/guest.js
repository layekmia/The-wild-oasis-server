const express = require('express');
const { createGuest, getGuest, updateGuest } = require('../controller/guest.controller');

const router = express.Router();

router.post('/', createGuest);
router.get('/:email', getGuest);
router.patch('/:id/update', updateGuest);


module.exports = router;