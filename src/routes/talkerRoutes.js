const express = require('express');
const validateTalkerLength = require('../middlewares/validateTalkerLength');
const talker = require('../talker.json');

const router = express.Router();

router.get('/', validateTalkerLength, (req, res) => res.status(200).json(talker));

module.exports = router;
