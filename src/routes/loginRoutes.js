const express = require('express');
const validateLogin = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateLogin, (req, res) => {
  const token = (Math.random().toString(36).substring(2)
    + Math.random().toString(36).substring(2)).substring(0, 16);

  return res.status(200).json({ token });
});

module.exports = router;
